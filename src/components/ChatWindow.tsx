import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ChatWindow.css";

type MessageType = {
  text: string;
  sender: "user" | "gpt";
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
  textData?: any;
  isText?: boolean;
  isMap?: boolean;
  mapData?: any;
};

type ChatWindowProps = {
  messages: MessageType[];
  onCitationLinkClick: () => void;
  handleMapModalOpen: () => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onCitationLinkClick,
  handleMapModalOpen
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current && messagesEndRef.current) {
      const container = containerRef.current;
      const contentHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;

      // Only scroll if content height exceeds container height
      if (contentHeight > containerHeight) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="chat-window-container flex flex-col p-10 space-y-4 h-[calc(100vh-200px)]"
    >
      <div className="flex flex-col space-y-4 h-[100px]"></div>
      <TransitionGroup className="flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <CSSTransition
            key={index}
            timeout={300}
            classNames="message"
            unmountOnExit
          >
            <Message
              text={msg.text}
              sender={msg.sender}
              isChart={msg.isChart}
              isList={msg.isList}
              isModal={msg.isModal}
              isTree={msg.isTree}
              isTable={msg.isTable}
              isCitation={msg.isCitation}
              chartData={msg.chartData}
              treeData={msg.treeData}
              imageData={msg.imageData}
              textData={msg.textData}
              listData={msg.listData}
              tableData={msg.tableData}
              isText={msg.isText}
              onCitationLinkClick={onCitationLinkClick}
              isMap={msg.isMap}
              mapData={msg.mapData}
              handleMapModalOpen={handleMapModalOpen}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
