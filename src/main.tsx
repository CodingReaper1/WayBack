import { ErrorBoundary } from "react-error-boundary";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { MapProvider } from "./context/MapContext.js";
import { MyPositionProvider } from "./context/MyPositionContext";
import { MainPageProvider } from "./context/MainPageContext";
import { LoginProvider } from "./context/LoginContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import ErrorFallback from "./ui/ErrorFallback";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/homepage")}
      >
        <LoginProvider>
          <MainPageProvider>
            <MapProvider>
              <MyPositionProvider>
                <App />
              </MyPositionProvider>
            </MapProvider>
          </MainPageProvider>
        </LoginProvider>
      </ErrorBoundary>
    </DarkModeProvider>
  </StrictMode>,
);
