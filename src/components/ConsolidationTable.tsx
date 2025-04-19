import React from "react";
import "./ConsolidationTable.css";

interface ConsolidationData {
  target: string;
  branchOverlap: number;
  branchCount: number;
}

interface ConsolidationTableProps {}

const consolidationData = [
  { target: "Bäckerei Theurer", branchOverlap: 100, branchCount: 19 },
  { target: "Backparadies Hug", branchOverlap: 100, branchCount: 15 },
  { target: "Bäckerei Otto Schall", branchOverlap: 94, branchCount: 31 },
  { target: "Rieglers Bäckerei", branchOverlap: 93, branchCount: 14 },
  { target: "Bäckerei Rutz", branchOverlap: 74, branchCount: 23 },
];

const ConsolidationTable: React.FC<ConsolidationTableProps> = ({}) => {
  return (
    <div className="consolidation-table-container">
      <div className="table-animation"></div>
      <div
        className="rounded-lg overflow-hidden bg-white shadow border border-gray-200"
        style={{ borderRadius: "20px" }}
      >
        <table className="w-full  ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 text-center">
                Consolidation targets
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 text-center">
                Branch overlap within 3km
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 text-center">
                No. of branches
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {consolidationData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700 text-center">
                  {item.target}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">
                  {item.branchOverlap}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 text-center">
                  {item.branchCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsolidationTable;
