import { createContext } from "react";

interface ChatConfig {
  shopId: string;
  webhookUrl: string;
  customerId?: string;
  primaryColor?: string;
}

const defaultConfig: ChatConfig = {
  shopId: "",
  webhookUrl: "",
  customerId: undefined,
  primaryColor: "#000000",
};

export const ChatConfigContext = createContext<ChatConfig>(defaultConfig);

export const ChatConfigProvider: React.FC<{
  value: ChatConfig;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <ChatConfigContext.Provider value={value}>
      {children}
    </ChatConfigContext.Provider>
  );
};
