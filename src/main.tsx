import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { PreferencesProvider } from "./providers/PreferencesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>
);
