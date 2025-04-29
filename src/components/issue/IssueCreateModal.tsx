import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { createIssue } from '@/api/issues';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import { IssueEditor } from './IssueEditor';

export function IssueCreateModal() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] }); // 이슈 목록 갱신
      setModalOpen(false);
    },
  });

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">➕ 새 이슈 생성</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-4 text-lg font-bold">
          새 이슈 작성
        </DialogTitle>
        <DialogDescription className="text-muted-foreground mb-4 text-sm">
          이슈 제목과 설명을 입력하고, 필요한 라벨과 담당자를 선택하세요.
        </DialogDescription>
        <IssueEditor
          onSubmit={(values) =>
            mutate({
              ...values,
              title: values.title,
            })
          }
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
