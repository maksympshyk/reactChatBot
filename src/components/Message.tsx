import React from "react";
import VerticalBarChart from "./BarChart";
import SynergyMetrics from "./SynergyMetrics";
import Modal from "./powerModal";
import TreeDivisionDiagram from "./Tree";
import ConsolidationTable from "./ConsolidationTable";
import CitationCard from "./CitationCard";

type MessageProps = {
  text: string;
  sender: "user" | "gpt";
  isChart?: boolean;
  isList?: boolean;
  isModal?: boolean;
  isTree?: boolean;
  isTable?: boolean;
  isCitation?: boolean;
  onCitationLinkClick?: () => void;
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
  onCitationLinkClick,
}) => {
  return (
    <div
      className={`py-1 px-2 my-2 max-w-1/2  ${
        sender === "user"
          ? "text-black bg-gray-300 rounded-full self-end"
          : "bg-white rounded-full"
      }`}
    >
      <div className="flex flex-col px-3 py-1 justify-center w-1/2" >
        {isChart ? <VerticalBarChart /> : <p>{text}</p>}
        {isList ? <SynergyMetrics metrics={[]} /> : null}
        {isTree && <TreeDivisionDiagram />}
        {isModal && <Modal imageUrl="/Group3.png" title="Synergy Graph" />}
        {isTable && <ConsolidationTable />}
        {isCitation && (
          <CitationCard
            citationText="The source for the value of equity"
            value="3,600"
            pageNumber={5}
            presentationLink="#"
            date="June 24th, 2019"
            location="Paris"
            onLinkClick={onCitationLinkClick}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
