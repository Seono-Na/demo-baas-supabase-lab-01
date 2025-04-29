import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IssueListPage } from './pages/IssueListPage';

export function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IssueListPage />;
      </QueryClientProvider>
      ;
    </>
  );
}
