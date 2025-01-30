import { initializeCSSVariables } from "@/utils/initialize-css-variables";
import { createContext, useEffect, useState } from "react";

interface ChatConfig {
  shopId: string;
  webhookUrl: string;
  customerId?: string;
  primaryColor?: string;
  chatbotImg?: string;
  title?: string;
  greetingMsg?: string;
}

const defaultConfig: ChatConfig = {
  shopId: "",
  webhookUrl: "",
  customerId: undefined,
  primaryColor: "#000000",
  greetingMsg: "Hello, I am your shop assistant! How can I help you ?",
};

type ChatConfigContextType = {
  config: ChatConfig;
  updateConfig: (newConfig: Partial<ChatConfig>) => void;
};

export const ChatConfigContext = createContext<ChatConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
});

export const ChatConfigProvider: React.FC<{
  initialValues: { shopId: string; webhookUrl: string };
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [config, setConfig] = useState<ChatConfig>(defaultConfig);

  const updateConfig = (newConfig: Partial<ChatConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  useEffect(() => {
    const chatbotConfig = async () => {
      try {
        const response = await fetch(
          `https://ezshopper-shopify-webapi.azurewebsites.net/api/webchatconfig/get?hostedShopId=${initialValues.shopId}`
        );
        const data = await response.json();
        if (data) {
          setConfig((prev) => ({
            ...prev,
            primaryColor: data?.primaryColor,
            chatbotImg: data?.iconImage,
            title: data?.title,
            webhookUrl: initialValues.webhookUrl,
            greetingMsg: data?.greetingMessage,
          }));
        }
        // Initialize global CSS variable
        initializeCSSVariables(data.primaryColor || "#000000");
      } catch (error) {
        console.error(error);
      }
    };
    if (initialValues.shopId) {
      chatbotConfig();
    }
  }, [initialValues]);

  return (
    <ChatConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ChatConfigContext.Provider>
  );
};
