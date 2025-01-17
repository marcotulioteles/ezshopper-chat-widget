import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// =============================================================================

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";

// /**
//  * Initializes the chatbot and attaches it to a specified DOM element.
//  * @param config - Configuration object with target selector.
//  * @example
//  * createChat({ target: '#chat-content' });
//  */
// export const createChat = (config: { target: string }) => {
//   const targetElement = document.querySelector(config.target);

//   if (!targetElement) {
//     console.error(`Target element ${config.target} not found.`);
//     return;
//   }

//   const root = createRoot(targetElement);
//   root.render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// };
