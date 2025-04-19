import React from "react";

type ModalProps = {
  imageUrl: string;
  title: string;
};

const Modal: React.FC<ModalProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex items-center shadow-lg p-4 bg-[#F6F6F8] rounded-lg hover:shadow-md transition-shadow border border-gray-200 min-w-fit w-fit">
      <img src={imageUrl} alt={title} className="w-32 h-30 rounded" />
      <div className="ml-4 flex-grow">
        <h3 className="text-gray-800 text-[24px] font-[500]">{title}</h3>
        <div className="flex items-center space-x-4 mt-2">
          <button className="text-gray-600 text-[18px] font-[400] hover:text-gray-900 transition-colors   flex items-center">
            Open in PowerPoint
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <button className="text-gray-600 text-[18px] font-[400] hover:text-gray-900 transition-colors   flex items-center">
            Download
            <div className="w-3"></div>
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
