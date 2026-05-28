import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import { initializeAnalytics } from "./lib/analytics";

initializeAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
