import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui-elements/card";
import { getFormattedLocalTime } from "@/utils/get-localtime-formatted";
import {
  Chats,
  Storefront,
  PaperPlaneRight,
  User,
  Handbag,
  WarningCircle,
  ArrowClockwise,
} from "@phosphor-icons/react";
import styles from "./styles.module.css";
import { getCSSVariable } from "@/utils/get-css-variable";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useChatConfig } from "@/hooks/useChatConfig";
import { ChatMessage } from "@/types/chat-messages.model";
import { BotTypingLoader } from "@/components/ui-elements/bot-typing-loader";
import ReactMarkdown from "react-markdown";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UIChatMessage {
  id: string;
  timestamp: string;
  sender: "customer" | "bot";
  message: string;
}

const LOCALSTORAGE_THREAD_ID_KEY = "@ezshopper-chat:threadId";
const LOCALSTORAGE_THREAD_ID_EXPIRATION_KEY =
  "@ezshopper-chat:threadIdExpiration";
const THREAD_ID_EXPIRATION_IN_MINUTES = 15;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIChatMessage[]>([]);
  const [threadData, setThreadData] = useLocalStorage<{
    threadId: string;
    latestCustomerMsg: string;
  }>(LOCALSTORAGE_THREAD_ID_KEY, {
    threadId: "",
    latestCustomerMsg: "",
  });
  const { isLoading, data, error, sendMessage } = useSendMessage();
  const { webhookUrl } = useChatConfig();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const primaryColor = getCSSVariable("--primary-color");

  const scrollToTheBottomMessages = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const setExpiration = () => {
    localStorage.setItem(
      LOCALSTORAGE_THREAD_ID_EXPIRATION_KEY,
      JSON.stringify({
        value: Date.now() + THREAD_ID_EXPIRATION_IN_MINUTES * 60 * 1000,
      })
    );
  };

  const sendMessageAction = () => {
    const expiration = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_THREAD_ID_EXPIRATION_KEY) ||
        JSON.stringify({ value: null })
    );

    if (!expiration.value) {
      setExpiration();
    }

    if (inputRef.current?.value) {
      const value = inputRef.current?.value.trim() as string;

      (inputRef.current as HTMLInputElement).value = "";

      const params = {
        message: value,
        threadId: expiration.value <= Date.now() ? "" : data.threadId,
      };

      if (expiration.value <= Date.now()) {
        setExpiration();
      }

      setThreadData({ ...threadData, latestCustomerMsg: value });
      sendMessage(webhookUrl, params);
    }
  };

  useEffect(() => {
    if (threadData.threadId !== "" && messages.length > 0) {
      const params = {
        message: threadData.latestCustomerMsg,
        threadId: threadData.threadId,
      };
      sendMessage(webhookUrl, params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          message: "Hi, how are you doing?",
          sender: "bot",
          timestamp: getFormattedLocalTime(),
        },
        {
          id: crypto.randomUUID(),
          message: "I am your store assistant, how can I help you?",
          sender: "bot",
          timestamp: getFormattedLocalTime(),
        },
      ]);
    } else {
      const msgs = (JSON.parse(data.result || "[]") as ChatMessage[]).map(
        (item) =>
          ({
            id: crypto.randomUUID(),
            timestamp: getFormattedLocalTime(),
            message: item.Content[0].Text,
            sender: item.Role === "ASSISTANT" ? "bot" : "customer",
          } as UIChatMessage)
      );
      setMessages(msgs);
      setThreadData({
        ...threadData,
        threadId: data.threadId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    scrollToTheBottomMessages();
  }, [messages, isLoading]);

  return (
    <div>
      <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
        <Chats color="#fff" size={28} />
      </button>

      {isOpen && (
        <Card
          additionalStyles={{
            position: "fixed",
            bottom: "96px",
            right: "20px",
            width: "100%",
            maxWidth: "384px",
          }}
        >
          <header className={styles.chatHeader}>
            <Storefront color="#fff" size={28} />
            <h1 className={styles.chatTitle}>ShopBuddy</h1>
          </header>
          <div className={styles.messagesWrapper}>
            <div ref={messagesContainerRef} className={styles.messagesContent}>
              {messages.map((msg, index) => (
                <div key={msg.id} className={styles.messageWrapper}>
                  <figure
                    className={styles.messageAvatar}
                    style={{
                      left: msg.sender === "customer" ? "4px" : "",
                      right: msg.sender === "bot" ? "4px" : "",
                      display:
                        (messages[index + 1] &&
                          msg.sender !== messages[index + 1].sender) ||
                        index === messages.length - 1
                          ? "block"
                          : "none",
                    }}
                  >
                    {msg.sender === "customer" ? (
                      <User
                        color="#6b7280"
                        size={20}
                        style={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ) : (
                      <Handbag
                        color={primaryColor}
                        size={20}
                        style={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                  </figure>
                  <div
                    className={styles.messageText}
                    style={{
                      marginLeft: msg.sender === "customer" ? "48px" : 0,
                      marginRight: msg.sender === "customer" ? 0 : "48px",
                      backgroundColor:
                        msg.sender === "customer"
                          ? "#f3f4f6"
                          : "var(--primary-color)",
                      color: msg.sender === "customer" ? "#111827" : "#ffffff",
                      fontWeight: msg.sender === "customer" ? "normal" : 600,
                    }}
                  >
                    {msg.sender === "bot" ? (
                      <ReactMarkdown>{msg.message}</ReactMarkdown>
                    ) : (
                      <span>{msg.message}</span>
                    )}
                  </div>
                  <time
                    className={styles.messageTimestamp}
                    style={{
                      display:
                        (messages[index + 1] &&
                          msg.sender !== messages[index + 1].sender) ||
                        index === messages.length - 1
                          ? "block"
                          : "none",
                      marginLeft: msg.sender === "customer" ? "48px" : 0,
                      marginRight: msg.sender === "customer" ? 0 : "48px",
                      justifySelf:
                        msg.sender === "customer" ? "flex-start" : "flex-end",
                    }}
                  >
                    {msg.timestamp}
                  </time>
                </div>
              ))}
              {isLoading && <BotTypingLoader />}
              {error && (
                <div className={styles.messageError}>
                  <div className={styles.messageErrorContent}>
                    <WarningCircle
                      color={getCSSVariable("--red-900")}
                      size={20}
                    />
                    <span>Unable to communicate with the assistant now.</span>
                  </div>
                  <button
                    onClick={() => {
                      const params = {
                        message: threadData.latestCustomerMsg,
                        threadId: threadData.threadId,
                      };
                      sendMessage(webhookUrl, params);
                    }}
                    className={styles.messageErrorBtn}
                  >
                    <ArrowClockwise
                      color={getCSSVariable("--red-900")}
                      size={16}
                    />
                  </button>
                </div>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                ref={inputRef}
                onKeyDown={(e) => e.key === "Enter" && sendMessageAction()}
                className={styles.messageInput}
                placeholder="Type a message..."
                disabled={Boolean(isLoading || error)}
              />
              <button
                type="button"
                className={styles.sendMessageButton}
                onClick={() => sendMessageAction()}
                disabled={Boolean(isLoading || error)}
              >
                <PaperPlaneRight color={primaryColor} size={24} />
              </button>
            </div>
            <footer className={styles.chatFooter}>
              Powered by{" "}
              <a
                href="https://ezshopper.ai/"
                target="_blank"
                rel="noreferrer"
                className={styles.ezShopperLink}
              >
                © EzShopper
              </a>
            </footer>
          </div>
        </Card>
      )}
    </div>
  );
};
