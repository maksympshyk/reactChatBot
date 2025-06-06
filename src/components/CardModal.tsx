import React from "react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagePath: string;
}

const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  imagePath,
}) => {
  if (!isOpen) return null;

  const handleOpenInPowerPoint = () => {
    // Add PowerPoint integration logic here
    console.log("Open in PowerPoint clicked");
  };

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = "Group3.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        style={{ borderRadius: "30px" }}
        className="bg-[rgb(238,238,238)] justify-start rounded-xl p-6 w-[50%] h-[50%] flex flex-col transform transition-transform duration-300 translate-y-full animate-slide-up"
      >
        <div className="w-full h-[80%] bg-[rgb(238,238,238)]  rounded-lg flex items-center justify-center">
          <img src={"/card.png"} className="w-full h-full rounded-2xl" />
        </div>
        <div className="w-full h-[20px]  rounded-lg flex items-center justify-center"></div>

        <div className="w-full h-[20%]   flex items-center justify-center">
          <div className="flex items-center justify-center bg-gray-50 p-5 rounded-full shadow-sm shadow-gray-300 shadow-lg h-full">
            <div className="flex items-center justify-center gap-4 w-[70%]">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Close
              </button>

              <div className="h-6 w-px bg-gray-300"></div>

              <button
                onClick={handleOpenInPowerPoint}
                className="px-4 py-2 text-xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                Page 1/23
              </button>

              <div className="h-6 w-px bg-gray-300"></div>
              <img src={"/left.png"} className="w-6   h-6 rounded" />
              <img src={"/right.png"} className="w-6 h-6 rounded" />
              <div className="h-6 w-px bg-gray-300"></div>

              <button
                onClick={handleDownload}
                className="px-4 py-2 text-xl text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              >
                Download
                <svg
                  className="w-4 h-4 ml-1"
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
      </div>
    </div>
  );
};

export default CardModal;
