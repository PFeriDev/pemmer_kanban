"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TagChip } from "@/components/widgets/TagChip";
import type { Card, Tag, Priority, CreateCardInput, UpdateCardInput } from "@/types";
import { PRIORITY_CONFIG } from "@/lib/utils";

interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateCardInput | UpdateCardInput) => Promise<void>;
  card?: Card | null;
  columnId?: string;
  availableTags: Tag[];
}

export function CardForm({
  open,
  onClose,
  onSave,
  card,
  columnId,
  availableTags,
}: CardFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(card?.title ?? "");
      setDescription(card?.description ?? "");
      setPriority(card?.priority ?? "MEDIUM");
      setDueDate(
        card?.dueDate
          ? new Date(card.dueDate).toISOString().slice(0, 10)
          : ""
      );
      setSelectedTagIds(card?.tags?.map((t) => t.id) ?? []);
    }
  }, [open, card]);

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        description: description.trim() || null,
        priority,
        dueDate: dueDate || null,
        tagIds: selectedTagIds,
        ...(columnId && !card ? { columnId } : {}),
      };
      await onSave(data as CreateCardInput | UpdateCardInput);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{card ? "Kártya szerkesztése" : "Új kártya"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="card-title">Cím *</Label>
            <Input
              id="card-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kártya neve..."
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="card-desc">Leírás</Label>
            <Textarea
              id="card-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Részletek, megjegyzések..."
              rows={3}
            />
          </div>

          {/* Priority + Due date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Prioritás</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${PRIORITY_CONFIG[p].dot}`}
                        />
                        {PRIORITY_CONFIG[p].label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="card-due">Határidő</Label>
              <Input
                id="card-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          {availableTags.length > 0 && (
            <div className="space-y-1.5">
              <Label>Címkék</Label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`transition-opacity ${
                      selectedTagIds.includes(tag.id) ? "opacity-100 ring-2 ring-offset-1" : "opacity-50"
                    } rounded-full`}
                    style={
                      selectedTagIds.includes(tag.id)
                        ? { ringColor: tag.color }
                        : undefined
                    }
                  >
                    <TagChip tag={tag} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Mégse
          </Button>
          <Button onClick={handleSave} disabled={!title.trim() || saving}>
            {saving ? "Mentés..." : card ? "Mentés" : "Létrehozás"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
