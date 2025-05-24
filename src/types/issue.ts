export type Issue = {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  assignee: string | null;
  created_at: string;
  updated_at: string;
};

// 입력 전용 타입
export type IssueCreateInput = {
  title: string;
  description?: string | null;
  status?: 'todo' | 'in-progress' | 'done'; // 없어도 기본값 'todo'로 들어감
  assignee?: string | null;
  updated_at?: string | null; // 직접 넣고 싶을 때만
};
