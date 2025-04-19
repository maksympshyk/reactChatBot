import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import ImageModal from "./components/ImageModal";
import ConsolidationTable from "./components/ConsolidationTable";
import CitationCard from "./components/CitationCard";
import CardModal from "./components/CardModal";
// import "./output.css";

type MessageType = {
  text: string;
  sender: "user" | "gpt";
  isChart?: boolean;
  isList?: boolean;
  isModal?: boolean;
  isTree?: boolean;
  isTable?: boolean;
  isCitation?: boolean;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    const modalMessage: MessageType = {
      text: "",
      sender: "gpt",
      isModal: true,
      isTree: false,
    };
    setMessages((prevMessages) => [...prevMessages, modalMessage]);
  };
  const handleCardModalClose = () => {
    setIsCardModalOpen(false);
  };
  const handleCitationLinkClick = () => {
    setIsCardModalOpen(true);
  };
  const handleSendMessage = async (message: string) => {
    const userMessage: MessageType = { text: message, sender: "user" };
    setMessages([...messages, userMessage]);

    // Check if user typed "card"
    if (message.toLowerCase().includes("card")) {
      const gptMessage: MessageType = {
        text: "",
        sender: "gpt",
        isCitation: true,
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      return;
    }

    // Check if user typed "modal"
    if (message.toLowerCase().includes("modal")) {
      setIsModalOpen(true);
      return;
    }

    // Check if user typed "table"
    if (message.toLowerCase().includes("table")) {
      const gptMessage: MessageType = {
        text: "",
        sender: "gpt",
        isTable: true,
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      return;
    }

    // Check if user asked for a chart
    if (message.toLowerCase().includes("chart")) {
      const gptMessage: MessageType = {
        text: "Here is the chart you requested:",
        sender: "gpt",
        isChart: true,
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      return;
    }
    if (message.toLowerCase().includes("list")) {
      const gptMessage: MessageType = {
        text: "",
        sender: "gpt",
        isList: true,
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      return;
    }
    if (message.toLowerCase().includes("tree")) {
      const gptMessage: MessageType = {
        text: "",
        sender: "gpt",
        isTree: true,
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      return;
    }
  };

  return (
    <div className=" flex h-screen flex-col justify-center items-center bg-white overflow-hidden">
      <div className="w-full xl:w-[80%] 2xl:w-[70%] h-full">
        <div
          className="flex-1 overflow-hidden p-4"
          // style={{ height: "calc(100vh - 100px)" }}
        >
          <ChatWindow
            messages={messages}
            onCitationLinkClick={handleCitationLinkClick}
          />
        </div>
        {loading && (
          <div className="text-center text-gray-500">GPT is typing...</div>
        )}
        <div className="p-4 bg-white border-gray-300">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>

        <ImageModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          imagePath="/Group3.png"
        />
        <CardModal
          isOpen={isCardModalOpen}
          onClose={handleCardModalClose}
          imagePath="/Group3.png"
        />
      </div>
    </div>
  );
};

export default App;
