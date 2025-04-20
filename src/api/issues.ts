import { supabase } from '@/shared/lib/supabaseClient';
import { Issue } from '@/types/issue';

// Read: 모든 이슈 불러오기
export async function fetchIssues(): Promise<Issue[]> {
  const { data, error } = await supabase.from('issues').select('*');
  if (error) throw error;
  return data as Issue[];
}

// 특정 이슈 불러오기
export async function fetchIssueById(id: string): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Issue;
}

// Create: 새 이슈 생성
export async function createIssue(issue: Omit<Issue, 'id' | 'created_at'>) {
  const { error } = await supabase.from('issues').insert([issue]);
  if (error) throw error;
}

// Update: 특정 이슈 수정
export async function updateIssue(
  id: string,
  update: Partial<Omit<Issue, 'id' | 'created_at'>>
) {
  const { error } = await supabase.from('issues').update(update).eq('id', id);
  if (error) throw error;
}

// Delete: 특정 이슈 삭제
export async function deleteIssue(id: string) {
  const { error } = await supabase.from('issues').delete().eq('id', id);
  if (error) throw error;
}
