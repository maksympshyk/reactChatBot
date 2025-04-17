import React from 'react';
import Message from './Message';

type MessageType = {
  text: string;
  sender: 'user' | 'gpt';
};

type ChatWindowProps = {
  messages: MessageType[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatWindow;
