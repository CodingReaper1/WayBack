import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { MapProvider } from "./context/MapContext.js";
import { MyPositionProvider } from "./context/MyPositionContext";
import { MainPageProvider } from "./context/MainPageContext";
import { LoginProvider } from "./context/LoginContext";
import { DarkModeProvider } from "./context/DarkModeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginProvider>
      <MainPageProvider>
        <MapProvider>
          <MyPositionProvider>
            <DarkModeProvider>
              <App />
            </DarkModeProvider>
          </MyPositionProvider>
        </MapProvider>
      </MainPageProvider>
    </LoginProvider>
  </StrictMode>,
);
