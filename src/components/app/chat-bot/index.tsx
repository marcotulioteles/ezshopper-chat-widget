// src/components/ChatBot.tsx
import { useEffect, useRef, useState } from "react";
import { DynamicHeroIcons } from "../../ui-elements/dynamic-heroicons";
import { Card } from "@/components/ui-elements/card";
import { classNamesSpreader } from "@/utils/classname-spreader";
import { getFormattedLocalTime } from "@/utils/get-localtime-formatted";

interface ChatMessage {
  timestamp: string;
  sender: "customer" | "bot";
  message: string;
}

const tailwindCustomScrollbar =
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLUListElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        timestamp: getFormattedLocalTime(),
        message: input,
        sender: "customer",
      },
    ]); // Mock response
    setInput("");
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
    scrollToTheBottomMessages();
  }, [isOpen]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].sender !== "bot") {
      setMessages((prev) => [
        ...prev,
        {
          timestamp: getFormattedLocalTime(),
          message:
            "Olá, sou seu assistente da loja e estou aqui para te ajudar",
          sender: "bot",
        },
      ]);
      setMessages((prev) => [
        ...prev,
        {
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
      <button
        className="max-w fixed bottom-5 right-5 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-800 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <DynamicHeroIcons
          className="size-6"
          iconName="ChatBubbleLeftRightIcon"
        />
      </button>

      {isOpen && (
        <Card additionalClassName="fixed bottom-[82px] right-5 w-full max-w-80">
          <header className="absolute flex items-center gap-2 top-0 left-0 w-full p-4 bg-pink-600">
            <DynamicHeroIcons
              className="size-7 text-white"
              iconName="BuildingStorefrontIcon"
            />
            <h1 className="text-white text-xl text-left">ShopBuddy</h1>
          </header>
          <div className="pt-6">
            <ul
              ref={messagesContainerRef}
              className={classNamesSpreader(
                "w-full h-full max-h-96 min-h-48 grid gap-1 overflow-y-auto my-6 pr-2",
                tailwindCustomScrollbar
              )}
            >
              {messages.map((msg, index) => (
                <li key={msg.timestamp} className="relative">
                  <figure
                    className={classNamesSpreader(
                      "max-w-10 p-2 rounded-full absolute bottom-10 shadow-xl",
                      msg.sender === "customer"
                        ? "left-1 bg-gray-50"
                        : "right-1 bg-gray-50 shadow-xl",
                      (messages[index + 1] &&
                        msg.sender !== messages[index + 1].sender) ||
                        index === messages.length - 1
                        ? "block"
                        : "hidden"
                    )}
                  >
                    {msg.sender === "customer" ? (
                      <DynamicHeroIcons
                        iconName="UserIcon"
                        className="size-4 text-gray-500"
                      />
                    ) : (
                      <DynamicHeroIcons
                        className="size-5 text-pink-600 stroke-2"
                        iconName="ShoppingBagIcon"
                      />
                    )}
                  </figure>
                  <blockquote
                    className={classNamesSpreader(
                      "text-xs py-2 px-3 rounded-lg shadow-md leading-5 text-left w-fit",
                      msg.sender === "customer"
                        ? "ml-12 mr-0 bg-gray-100"
                        : "mr-12 ml-0 bg-pink-600 text-white font-semibold"
                    )}
                  >
                    {msg.message}
                  </blockquote>
                  <time
                    className={classNamesSpreader(
                      "flex text-[10px] text-gray-500 pt-3 pb-5",
                      (messages[index + 1] &&
                        msg.sender !== messages[index + 1].sender) ||
                        index === messages.length - 1
                        ? "block"
                        : "hidden",
                      msg.sender === "customer"
                        ? "ml-12 mr-0"
                        : "mr-12 ml-0 justify-end"
                    )}
                  >
                    {msg.timestamp}
                  </time>
                </li>
              ))}
            </ul>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="block w-full rounded-md bg-white pl-3 pr-8 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"
                placeholder="Type a message..."
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 group"
                onClick={() => sendMessage()}
              >
                <DynamicHeroIcons
                  className="size-5 text-pink-600 group-hover:scale-125 transition-all"
                  iconName="PaperAirplaneIcon"
                />
              </button>
            </div>
            <footer className="text-left pt-2 text-[10px] text-gray-500">
              Powered by{" "}
              <a
                href="https://ezshopper.ai/"
                target="_blank"
                rel="noreferrer"
                className="font-bold hover:text-pink-600"
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
