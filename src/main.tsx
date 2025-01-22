// ==== For local tests ========================================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChatConfigProvider } from "./contexts/chat-config.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatConfigProvider
      value={{
        shopId: "",
        webhookUrl:
          "https://ezshopper-shopify-webapi.azurewebsites.net/api/chatbot-realtime/SendMessage",
      }}
    >
      <App />
    </ChatConfigProvider>
  </StrictMode>
);

// ==== For production =========================================================

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import { initializeCSSVariables } from "./utils/initialize-css-variables.ts";
// import { ChatConfigProvider } from "./contexts/chat-config.context.tsx";

// /**
//  * Initializes the chatbot and attaches it to a specified DOM element.
//  * @param config - Configuration object with target selector.
//  * @example
//  * createChat({ target: '#chat-content' });
//  */
// export const createChat = (config: {
//   shopId: string;
//   webhookUrl: string;
//   target: string;
//   customerId?: string;
//   primaryColor?: string;
// }) => {
//   // Initialize global CSS variable
//   const primaryColor = config.primaryColor || "#000000"; // Default color
//   initializeCSSVariables(primaryColor);

//   const targetElement = document.querySelector(config.target);

//   if (!targetElement) {
//     console.error(`Target element ${config.target} not found.`);
//     return;
//   }

//   const root = createRoot(targetElement);
//   root.render(
//     <StrictMode>
//       <ChatConfigProvider value={config}>
//         <App />
//       </ChatConfigProvider>
//     </StrictMode>
//   );
// };
