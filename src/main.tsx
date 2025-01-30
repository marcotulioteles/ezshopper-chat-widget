// ==== For local tests ========================================================
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import { ChatConfigProvider } from "./contexts/chat-config.context.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ChatConfigProvider
//       initialValues={{
//         shopId: "73370632441",
//         webhookUrl:
//           "https://ezshopper-shopify-webapi.azurewebsites.net/api/chatbot-realtime/SendMessage",
//       }}
//     >
//       <App />
//     </ChatConfigProvider>
//   </StrictMode>
// );

// ==== For production =========================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChatConfigProvider } from "./contexts/chat-config.context.tsx";

/**
 * Initializes the chatbot and attaches it to a specified DOM element.
 * @param config - Configuration object with target selector.
 * @example
 * createChat({ target: '#chat-content' });
 */
export const createChat = (config: {
  shopId: string;
  webhookUrl: string;
  target: string;
  customerId?: string;
  primaryColor?: string;
}) => {
  const targetElement = document.querySelector(config.target);

  if (!targetElement) {
    console.error(`Target element ${config.target} not found.`);
    return;
  }

  const root = createRoot(targetElement);
  root.render(
    <StrictMode>
      <ChatConfigProvider
        initialValues={{
          shopId: String(config.shopId),
          webhookUrl: config.webhookUrl,
        }}
      >
        <App />
      </ChatConfigProvider>
    </StrictMode>
  );
};
