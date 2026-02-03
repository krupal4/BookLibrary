import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StylesProvider } from "./StylesProvider";
import "./app.css";

const queryClient = new QueryClient();
export default function App() {
  return (
    <StylesProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />;
      </QueryClientProvider>
    </StylesProvider>
  );
}