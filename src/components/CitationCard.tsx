import React from "react";

interface CitationCardProps {
  data: any;
  citationText: string;
  value: string;
  pageNumber: number;
  presentationLink: string;
  date: string;
  location: string;
  onLinkClick?: () => void;
}

const CitationCard: React.FC<CitationCardProps> = ({
  data,
  citationText,
  value,
  pageNumber,
  presentationLink,
  date,
  location,
  onLinkClick
}) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <div className="max-w-2xl  p-4">
      <div className="mb-4 text-gray-800">
        The source for the{" "}
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full">
          {value}
        </span>{" "}
        million figure for the value of equity is on page {pageNumber} in the
        investor presentation linked below.
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-4 border-2 border-gray-200">
        <div className="flex items-center justify-between">
          <img
            src={data.src}
            alt="Company Logo"
            className="w-full h-full rounded-lg border-10 border-gray-200/10"
          />
        </div>

        <div className="p-4 bg-white">
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            onClick={handleLinkClick}
          >
            <span>Open Presentation</span>
            <div className="ml-2"></div>
            <img
              src="/Frame.png"
              alt="Company Logo"
              className="w-5 h-5 rounded-lg border-10 border-gray-200/10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CitationCard;
