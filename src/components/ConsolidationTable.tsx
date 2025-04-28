import React from "react";
import "./ConsolidationTable.css";

interface TableData {
  columns: string[];
  rows: string[][];
}

interface ConsolidationTableProps {
  data: TableData;
}

const ConsolidationTable: React.FC<ConsolidationTableProps> = ({ data }) => {
  return (
    <div className="consolidation-table-container">
      <div className="table-animation"></div>
      <div
        className="rounded-lg overflow-hidden bg-white shadow border border-[rgba(194,194,194,1)]"
        style={{ borderRadius: "20px" }}
      >
        <table className="w-full">
          <thead className="bg-[rgba(240,240,240,1)]">
            <tr>
              {data.columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-base font-medium text-gray-700 text-center"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-4 text-base text-gray-700/50 ${
                      cellIndex === 0 ? "text-left" : "text-center"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsolidationTable;
