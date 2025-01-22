import { ChatConfigContext } from "@/contexts/chat-config.context";
import { useContext } from "react";

export const useChatConfig = () => useContext(ChatConfigContext);
