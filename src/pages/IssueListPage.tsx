import { useEffect, useState } from 'react';

import { deleteIssue, fetchIssues } from '@/api/issues';
import { Button } from '@/shared/components/ui/button';
import { Issue } from '@/types/issue';

export function IssueListPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const loadIssues = async () => {
    setLoading(true);
    try {
      const data = await fetchIssues();
      setIssues(data);
    } catch (err) {
      console.error('불러오기 실패', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제할까요?')) return;
    try {
      await deleteIssue(id);
      await loadIssues(); // 새로고침
    } catch (err) {
      console.error('삭제 실패', err);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-xl font-bold">📋 이슈 목록</h1>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <ul className="space-y-2">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="flex items-center justify-between rounded border p-3"
            >
              <div>
                <p className="font-semibold">{issue.title}</p>
                <p className="text-sm text-gray-500">{issue.status}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(issue.id)}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
