import React from "react";
import VerticalBarChart from "./BarChart";
import SynergyMetrics from "./SynergyMetrics";
import Modal from "./powerModal";
import TreeDivisionDiagram from "./Tree";
import ConsolidationTable from "./ConsolidationTable";
import CitationCard from "./CitationCard";
import Map from "./Map";

type MessageProps = {
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
  imageData?: any;
  listData?: any;
  tableData?: any;
  textData?: any;
  isText?: boolean;
  onCitationLinkClick?: () => void;
  isMap?: boolean;
  mapData?: any;
  handleMapModalOpen?: () => void;
};

const Message: React.FC<MessageProps> = ({
  text,
  sender,
  isChart,
  isList,
  isModal,
  isTree,
  isTable,
  isCitation,
  chartData,
  treeData,
  imageData,
  listData,
  tableData,
  isText,
  textData,
  onCitationLinkClick,
  isMap,
  mapData,
  handleMapModalOpen
}) => {
  console.log(text);
  return (
    <div
      className={`py-3 px-3 my-2 max-w-1/2  ${
        sender === "user"
          ? "text-black bg-[#E7E7EF] rounded-[40px] self-end"
          : "bg-white rounded-full"
      }`}
    >
      <div className="flex flex-col px-3 py-1 justify-center max-w-[450px]">
        <p className="text-[18px] font-[400]">{text}</p>
      </div>

      <div className="flex flex-col px-3 py-1 justify-center w-2/3 gap-4">
        {isChart && (
          <VerticalBarChart data={chartData.data} options={chartData.options} />
        )}
        {isText && <div className="text-black">{textData}</div>}
        {isList ? <SynergyMetrics items={listData} /> : null}

        {isTree && <TreeDivisionDiagram data={treeData} />}
        {isModal && <Modal imageUrl="/Group3.png" title="Synergy Graph" />}
        {isTable && <ConsolidationTable data={tableData} />}
        {isCitation && (
          <CitationCard
            data={imageData}
            citationText="The source for the value of equity"
            value="3,600"
            pageNumber={5}
            presentationLink="#"
            date="June 24th, 2019"
            location="Paris"
            onLinkClick={onCitationLinkClick}
          />
        )}
        {isMap && (
          <Map
            imageUrl="/MapLeft.png"
            title="Detail Map"
            mapData={mapData}
            handleMapModalOpen={handleMapModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
