import React from 'react';

type MessageProps = {
  text: string;
  sender: 'user' | 'gpt';
};

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div
      className={`p-3 my-2 ${sender === 'user' ? 'text-black bg-gray-300 rounded-2xl self-end' : 'bg-gray-200'}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Message;
