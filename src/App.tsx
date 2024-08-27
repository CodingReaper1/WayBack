import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NewLogin from "./pages/NewLogin";
import DarkModeToggle from "./components/HomePage/DarkModeToggle";
import Confirm from "./pages/Confirm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeToggle display={false} />

      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="login" element={<NewLogin />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="confirm" element={<Confirm />} />

          <Route
            path="map/:id"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3 * 1000,
          },
          error: {
            duration: 5 * 1000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "",
            zIndex: 9999,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
