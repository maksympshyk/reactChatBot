import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import ImageModal from "./components/ImageModal";
import MapModal from "./components/MapModal";
import ConsolidationTable from "./components/ConsolidationTable";
import CitationCard from "./components/CitationCard";
import CardModal from "./components/CardModal";
import { determineMessageType } from "./utils/messageType";
// import "./output.css";

export type MessageType = {
  text: string;
  sender: "user" | "gpt";
  isText?: boolean;
  isChart?: boolean;
  isList?: boolean;
  isModal?: boolean;
  isTree?: boolean;
  isTable?: boolean;
  isCitation?: boolean;
  chartData?: any;
  treeData?: any;
  listData?: any;
  imageData?: any;
  tableData?: any;
  mapData?: any;
  isMap?: boolean;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [mapData, setMapData] = useState<any>({});
  const handleModalClose = () => {
    setIsModalOpen(false);
    const modalMessage: MessageType = {
      text: "",
      sender: "gpt",
      isModal: true,
      isTree: false
    };
    setMessages((prevMessages) => [...prevMessages, modalMessage]);
  };
  const handleCardModalClose = () => {
    setIsCardModalOpen(false);
  };
  const handleMapModalClose = () => {
    setIsMapModalOpen(false);
    const modalMessage: MessageType = {
      text: "",
      sender: "gpt",
      isMap: true
    };
    setMessages((prevMessages) => [...prevMessages, modalMessage]);
  };
  const handleCitationLinkClick = () => {
    setIsCardModalOpen(true);
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: MessageType = {
      text: message,
      sender: "user",
      isText: true
    };
    let gptMessage: MessageType = {
      text: "",
      sender: "gpt"
    };
    setMessages([...messages, userMessage]);

    const messageType = await determineMessageType(message);

    if (messageType.isText) {
      const gptMessage: MessageType = {
        text: "adds 25 new local markets (16M consumers)",
        sender: "gpt",
        isText: true
      };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      return;
    }
    // Check if user typed "card"
    if (messageType.isCitation) {
      gptMessage = {
        ...gptMessage,
        isCitation: true,
        imageData: messageType.imageData
      };
    }

    // Check if user typed "modal"
    if (messageType.isModal) {
      setIsModalOpen(true);
      return;
    }

    // Check if user typed "table"
    if (messageType.isTable) {
      gptMessage = {
        ...gptMessage,
        isTable: true,
        tableData: messageType.tableData
      };
    }

    // Check if user asked for a chart
    if (messageType.isChart) {
      gptMessage = {
        ...gptMessage,
        isChart: true,
        chartData: messageType.chartData
      };
    }
    if (messageType.isList) {
      gptMessage = {
        ...gptMessage,
        isList: true,
        listData: messageType.listData
      };
    }
    if (messageType.isTree) {
      gptMessage = {
        ...gptMessage,
        isTree: true,
        treeData: messageType.treeData
      };
    }
    if (messageType.isMap) {
      setMapData(messageType.mapData);
      setIsMapModalOpen(true);
    }
    setMessages((prevMessages) => [...prevMessages, gptMessage]);
    return;
  };

  return (
    <div className=" flex h-screen flex-col justify-center items-center bg-white overflow-hidden">
      <div className="w-full xl:w-[80%] 2xl:w-[70%] h-full">
        <div
          className="flex-1 overflow-y-auto p-4"
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
        <MapModal
          isOpen={isMapModalOpen}
          onClose={handleMapModalClose}
          data={mapData}
        />
      </div>
    </div>
  );
};

export default App;
