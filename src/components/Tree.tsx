import React from "react";
import "./Tree.css"; // Import the CSS file for styling
const TreeDivisionDiagram: React.FC = () => {
  return (
    <div className="py-10">
      <div className="relative w-[500px] h-[360px] flex justify-center items-center ">
        {/* Horizontal line from left to center */}
        <div className="tree-animation w-full h-full z-10"></div>
        <div className="absolute left-0 top-1/2 w-[120px] h-px bg-gray-300 z-1" />

        {/* Left value */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-1">
          <div className="w-20 text-center py-1 bg-white border rounded-full text-sm font-medium">
            12.8x
          </div>
        </div>

        {/* Vertical branch connecting numerator and denominator */}
        <div>
          <div className="absolute left-[120px] top-[80px] h-[200px] w-px bg-gray-300" />
          <div className="absolute left-[120px] top-[80px] h-px w-4  bg-gray-300" />
          <div className="absolute left-[120px] top-[280px] h-px w-4 bg-gray-300" />
        </div>

        {/* Slash symbol */}
        <div className="absolute left-[168px] top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          /
        </div>

        {/* Numerator block */}
        <div className="absolute top-[30px] left-[136px]">
          <div className="flex items-center">
            <div className="rounded-full border bg-white w-20 text-center py-1 text-sm font-medium">
              5,000
            </div>
            <div className="w-[20px] h-px bg-gray-300" />
            <div className="w-px h-16 bg-gray-300" />
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <div className="h-px w-[20px] bg-gray-300" />
                <div className="rounded-full border bg-white w-20 text-center py-1 text-sm font-medium">
                  3,600
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm ml-[50px]">
                +
              </div>
              <div className="flex items-center">
                <div className="h-px w-[20px] bg-gray-300" />
                <div className="rounded-full border bg-white w-20 text-center py-1 text-sm font-medium">
                  1,400
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Denominator block */}
        <div className="absolute top-[230px] left-[136px]">
          <div className="flex items-center">
            <div className="rounded-full border bg-white w-20 text-center py-1 text-sm font-medium">
              392
            </div>
            <div className="w-[20px] h-px bg-gray-300" />
            <div className="w-px h-16 bg-gray-300" />
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <div className="h-px w-[20px] bg-gray-300" />
                <div className="rounded-full border bg-white w-20 text-center py-1 text-sm font-medium">
                  178
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm ml-[50px]">
                +
              </div>
              <div className="flex items-center">
                <div className="h-px w-[20px] bg-gray-300" />
                <div className="rounded-full border bg-white w-20 text-center py-1 text-sm font-medium">
                  123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDivisionDiagram;
