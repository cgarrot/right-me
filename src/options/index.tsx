import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import Options from "./options";
import "../static/i18n";

function init() {
  const appContainer = document.createElement("div");
  appContainer.className = "radio-canada-big";
  appContainer.style.width = "100%";
  appContainer.style.height = "100%";
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  console.log(appContainer);
  root.render(<Options />);
}

init();
