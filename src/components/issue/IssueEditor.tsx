import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';

const issueSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.'),
  description: z.string().optional(),
  assignee: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
});

type IssueFormValues = z.infer<typeof issueSchema>;

interface IssueEditorProps {
  onSubmit: (values: IssueFormValues) => void;
  isSubmitting?: boolean;
  defaultValues?: IssueFormValues;
}

export function IssueEditor({
  onSubmit,
  isSubmitting = false,
  defaultValues,
}: IssueEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormValues>({
    resolver: zodResolver(issueSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      assignee: '',
      status: 'todo',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="제목" {...register('title')} />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Textarea placeholder="설명 (선택)" {...register('description')} />
      </div>
      <div>
        <Input placeholder="담당자 (선택)" {...register('assignee')} />
        {errors.assignee && (
          <p className="text-sm text-red-500">{errors.assignee.message}</p>
        )}
      </div>

      <div>
        <Select defaultValue={defaultValues?.status ?? 'todo'}>
          <SelectTrigger>
            <SelectValue placeholder="📝 할 일" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">📝 할 일</SelectItem>
            <SelectItem value="in-progress">🚧 진행 중</SelectItem>
            <SelectItem value="done">✅ 완료</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '저장 중...' : '저장'}
      </Button>
    </form>
  );
}
