import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function App() {
  return <QueryClientProvider client={queryClient}>
    <Outlet />;
  </QueryClientProvider>
}