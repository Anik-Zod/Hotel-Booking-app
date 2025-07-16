import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
