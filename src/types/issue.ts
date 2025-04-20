export type Issue = {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  assignee: string | null;
  created_at: string;
  updated_at: string;
};
