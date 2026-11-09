import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './pages/home-page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Чтобы не делало запрос при переключении вкладок
      staleTime: 1000 * 60 * 5,    // Данные считаются свежими 5 минут
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
