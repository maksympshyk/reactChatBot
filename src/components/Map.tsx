import React from "react";

type ModalProps = {
  imageUrl: string;
  title: string;
};

const Map: React.FC<ModalProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex items-center shadow-lg p-4 bg-[#F6F6F8] rounded-lg hover:shadow-md transition-shadow border border-gray-200 min-w-fit w-fit">
      <img src={imageUrl} alt={title} className="w-32 h-30 rounded" />
      <div className="ml-4 flex-grow">
        <h3 className="text-gray-800 text-[24px] font-[500]">{title}</h3>
        <div className="flex items-center space-x-4 mt-2">
          <button className="text-gray-600 text-[18px] font-[400] hover:text-gray-900 transition-colors   flex items-center">
            Open Map
            <div className="w-3"></div>
            <svg
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.33333 1.51823C1.33333 1.15004 1.63181 0.851562 2 0.851562H7.99999C8.36819 0.851562 8.66666 1.15004 8.66666 1.51823V7.51823C8.66666 7.88643 8.36819 8.1849 7.99999 8.1849C7.63179 8.1849 7.33333 7.88643 7.33333 7.51823V3.1277L1.13807 9.32296C0.87772 9.58329 0.455607 9.58329 0.19526 9.32296C-0.0650867 9.06263 -0.0650867 8.6405 0.19526 8.38016L6.39053 2.1849H2C1.63181 2.1849 1.33333 1.88642 1.33333 1.51823Z"
                fill="black"
                fill-opacity="0.5"
              />
            </svg>
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

export default Map;
