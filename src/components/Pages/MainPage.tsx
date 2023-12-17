import MainPageTemplate from '../Templates/MainPageTemplate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MainPage() {
  //컴포넌트 초기화용 key
  const key = Math.random().toString(36).substring(7);
  return (
    <QueryClientProvider client={queryClient}>
      <MainPageTemplate key={key} />
    </QueryClientProvider>
  )
}
