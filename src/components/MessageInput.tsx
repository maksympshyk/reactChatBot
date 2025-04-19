import React, { useState } from "react";

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-2 border-[#D1D1D1] mb-10 rounded-3xl">
      <div className="relative  flex border-8 border-[#F4F4F4] rounded-3xl justify-center items-center ">
        <input
          type="text"
          id="prompt"
          className="block w-full p-6 text-sm text-gray-900 border-2 border-[#D1D1D1] rounded-2xl bg-gray-50 focus:ring-none focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Write your prompt"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          value={message}
          required
        />
        <button
          type="submit"
          onClick={handleSend}
          className="absolute end-1.5 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-[1.5px] border-black"
        >
          <svg width="19" height="19" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7929 4.04289C11.1834 3.65237 11.8166 3.65237 12.2071 4.04289L18.7071 10.5429C19.0976 10.9334 19.0976 11.5666 18.7071 11.9571C18.3166 12.3476 17.6834 12.3476 17.2929 11.9571L12.5 7.16421V20.25C12.5 20.8023 12.0523 21.25 11.5 21.25C10.9477 21.25 10.5 20.8023 10.5 20.25V7.16421L5.70711 11.9571C5.31658 12.3476 4.68342 12.3476 4.29289 11.9571C3.90237 11.5666 3.90237 10.9334 4.29289 10.5429L10.7929 4.04289Z" fill="white"/>
          </svg>
        </button>

        <button
          type="submit"
          onClick={handleSend}
          className="absolute end-10 text-black border bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-gray-500"
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2667 3.36628C10.2667 2.94286 9.9235 2.59961 9.50007 2.59961C9.07664 2.59961 8.7334 2.94286 8.7334 3.36628V15.6329C8.7334 16.0564 9.07664 16.3996 9.50007 16.3996C9.9235 16.3996 10.2667 16.0564 10.2667 15.6329V3.36628Z" fill="black" fill-opacity="0.5"/>
            <path d="M6.43341 4.90039C6.85683 4.90039 7.20008 5.24364 7.20008 5.66706V13.3337C7.20008 13.7572 6.85683 14.1004 6.43341 14.1004C6.01 14.1004 5.66675 13.7572 5.66675 13.3337V5.66706C5.66675 5.24364 6.01 4.90039 6.43341 4.90039Z" fill="black" fill-opacity="0.5"/>
            <path d="M3.36676 7.2002C3.79018 7.2002 4.13343 7.54345 4.13343 7.96686V11.0335C4.13343 11.457 3.79018 11.8002 3.36676 11.8002C2.94335 11.8002 2.6001 11.457 2.6001 11.0335V7.96686C2.6001 7.54345 2.94335 7.2002 3.36676 7.2002Z" fill="black" fill-opacity="0.5"/>
            <path d="M12.5667 6.43359C12.9901 6.43359 13.3334 6.77685 13.3334 7.20026V11.8003C13.3334 12.2237 12.9901 12.5669 12.5667 12.5669C12.1433 12.5669 11.8 12.2237 11.8 11.8003V7.20026C11.8 6.77685 12.1433 6.43359 12.5667 6.43359Z" fill="black" fill-opacity="0.5"/>
            <path d="M16.4 4.90046C16.4 4.47704 16.0568 4.13379 15.6334 4.13379C15.2099 4.13379 14.8667 4.47704 14.8667 4.90046V14.1005C14.8667 14.5239 15.2099 14.8671 15.6334 14.8671C16.0568 14.8671 16.4 14.5239 16.4 14.1005V4.90046Z" fill="black" fill-opacity="0.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
