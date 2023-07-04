import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from "react-query";
import { NotifyContextProvider } from "./NotifyContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotifyContextProvider>
      <App />
    </NotifyContextProvider>
  </QueryClientProvider>
);