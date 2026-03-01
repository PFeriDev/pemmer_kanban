export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Card {
  id: string;
  title: string;
  description: string | null;
  order: number;
  priority: Priority;
  dueDate: Date | string | null;
  tags: Tag[];
  columnId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  color: string;
  boardId: string;
  cards: Card[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Board {
  id: string;
  title: string;
  description: string | null;
  color: string;
  columns: Column[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateCardInput {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | null;
  columnId: string;
  tagIds?: string[];
}

export interface UpdateCardInput {
  title?: string;
  description?: string | null;
  priority?: Priority;
  dueDate?: string | null;
  tagIds?: string[];
}

export interface CreateColumnInput {
  title: string;
  color?: string;
  boardId: string;
}

export interface UpdateColumnInput {
  title?: string;
  color?: string;
}

export interface MoveCardInput {
  cardId: string;
  targetColumnId: string;
  newOrder: number;
}
