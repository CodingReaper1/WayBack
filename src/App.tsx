import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Confirm from "./features/auth/Confirm";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Fallback from "./ui/Fallback";

const HomePage = lazy(() => import("./pages/HomePage"));
const NewLogin = lazy(() => import("./pages/NewLogin"));
const MainPage = lazy(() => import("./pages/MainPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PasswordRecovery = lazy(() => import("./pages/PasswordRecovery"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

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

      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="login" element={<NewLogin />} />
            <Route path="*" element={<PageNotFound />} />

            <Route path="confirm" element={<Confirm />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
            <Route path="reset-password" element={<ResetPassword />} />

            <Route
              path="map/:id"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
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
