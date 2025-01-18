import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui-elements/card";
import { getFormattedLocalTime } from "@/utils/get-localtime-formatted";
import {
  Chats,
  Storefront,
  PaperPlaneRight,
  User,
  Handbag,
} from "@phosphor-icons/react";
import styles from "./styles.module.css";
import { getCSSVariable } from "@/utils/get-css-variable";

interface ChatMessage {
  id: string;
  timestamp: string;
  sender: "customer" | "bot";
  message: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesContainerRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const primaryColor = getCSSVariable("--primary-color");

  const sendMessage = () => {
    if (inputRef.current?.value) {
      const value = inputRef.current?.value.trim() as string;

      (inputRef.current as HTMLInputElement).value = "";

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          timestamp: getFormattedLocalTime(),
          message: value,
          sender: "customer",
        },
      ]);
    }
  };

  const scrollToTheBottomMessages = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (messages.length === 1 && messages[0].sender !== "bot") {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          timestamp: getFormattedLocalTime(),
          message:
            "Olá, sou seu assistente da loja e estou aqui para te ajudar",
          sender: "bot",
        },
      ]);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          timestamp: getFormattedLocalTime(),
          message: "Qual informação você precisa?",
          sender: "bot",
        },
      ]);
    }

    scrollToTheBottomMessages();
  }, [messages]);

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
            <ul ref={messagesContainerRef} className={styles.messagesContent}>
              {messages.map((msg, index) => (
                <li key={msg.id} className={styles.messageWrapper}>
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
                  <blockquote
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
                    {msg.message}
                  </blockquote>
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
                </li>
              ))}
            </ul>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                ref={inputRef}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className={styles.messageInput}
                placeholder="Type a message..."
              />
              <button
                type="button"
                className={styles.sendMessageButton}
                onClick={() => sendMessage()}
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
