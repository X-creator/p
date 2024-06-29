import React from "react";
import ReactDOM from "react-dom/client";
import App from "app/app.tsx";

if ("serviceWorker" in navigator) {
  void navigator.serviceWorker.register(
    import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
    { type: import.meta.env.MODE === "production" ? "classic" : "module" },
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
