export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Person {
  id: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Card {
  id: string;
  title: string;
  description: string | null;
  order: number;
  priority: Priority;
  dueDate: Date | string | null;
  tags: Tag[];
  assignees: Person[];
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

export interface Note {
  id: string;
  title: string;
  content: string;
  personId: string | null;
  person?: Person | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  allDay: boolean;
  color: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Album {
  id: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  photos?: Photo[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string | null;
  albumId: string | null;
  album?: Album | null;
  personId: string | null;
  person?: Person | null;
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
  assigneeIds?: string[];
}

export interface UpdateCardInput {
  title?: string;
  description?: string | null;
  priority?: Priority;
  dueDate?: string | null;
  tagIds?: string[];
  assigneeIds?: string[];
}
