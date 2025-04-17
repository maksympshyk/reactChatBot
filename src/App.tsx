import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './output.css';

type MessageType = {
  text: string;
  sender: 'user' | 'gpt';
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: MessageType = { text: message, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Call OpenAI API
    // setLoading(true);
    // try {
    //   const response = await axios.post(
    //     'https://api.openai.com/v1/completions',
    //     {
    //       model: 'text-davinci-003', // Use GPT-3 model
    //       prompt: message,
    //       max_tokens: 150,
    //       temperature: 0.7,
    //     },
    //     {
    //       headers: {
    //         'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    //       },
    //     }
    //   );

    //   const gptMessage: MessageType = { text: response.data.choices[0].text.trim(), sender: 'gpt' };
    //   setMessages([...messages, gptMessage]);
    // } catch (error) {
    //   console.error('Error fetching GPT response', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <ChatWindow messages={messages} />
      {loading && <div className="text-center text-gray-500">GPT is typing...</div>}
      <div className="absolute bottom-0 left-0 w-full">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
