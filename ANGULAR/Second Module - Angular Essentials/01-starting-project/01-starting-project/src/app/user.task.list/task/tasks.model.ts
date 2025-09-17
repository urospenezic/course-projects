export interface Task {
    id: string;
    userId: string;
    title: string;
    summary: string;
    dueDate: Date;
  }

export interface TaskData{
  title: string;
  summary: string;
  dueDate: Date;
  userId: string;
}