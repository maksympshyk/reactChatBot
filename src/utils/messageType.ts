import { MessageType } from "../App";
import { apiCall } from "./apiClient";

export const determineMessageType = async (
  text: string
): Promise<Partial<MessageType>> => {
  // const lowerText = "Show me a " + text.toLowerCase();
  let data = await apiCall("POST", { message: text, id: "xxxx" });
  if (data.content) {
    let content = data.content;
    let result = {};
    content.map((item: any) => {
      if (item.type === "chart") {
        result = {
          ...result,
          isChart: true,
          chartData: item
        };
      }
      if (item.type === "tree") {
        result = {
          ...result,
          isTree: true,
          treeData: item.nodes
        };
      }
      if (item.type === "table") {
        result = {
          ...result,
          isTable: true,
          tableData: item
        };
      }
      if (item.type === "synergyTable") {
        result = {
          ...result,
          isList: true,
          listData: item.items
        };
      }
      if (item.type === "map") {
        result = {
          ...result,
          isMap: true,
          mapData: item
        };
      }
      if (item.type === "image") {
        result = {
          ...result,
          isCitation: true,
          imageData: item
        };
      }
    });
    // if (content.type === "chart") {
    //   result = {
    //     ...result,
    //     isChart: true,
    //     chartData: content
    //   };
    // }
    // if (content.type === "tree") {
    //   result = {
    //     ...result,
    //     isTree: true,
    //     treeData: content.nodes
    //   };
    // }
    // if (content.type === "table") {
    //   result = {
    //     ...result,
    //     isTable: true,
    //     tableData: content[0]
    //   };
    // }
    // if (content.type === "synergeTable") {
    //   result = {
    //     ...result,
    //     isList: true,
    //     listData: content.items
    //   };
    // }
    // if (content.type === "map") {
    //   result = {
    //     ...result,
    //     isMap: true,
    //     mapData: content
    //   };
    // }
    // return data.content[0] as Partial<MessageType>;

    // Check for specific keywords to determine message type
    // if (lowerText.includes("chart") || lowerText.includes("graph")) {
    //   return {
    //     isChart: true,
    //     chartData: {
    //       data: {
    //         labels: [
    //           "UBS/Credit",
    //           "Julius Bär",
    //           "EFG/BSI",
    //           "Rathbones",
    //           "Rothschild",
    //           "ABN Amro",
    //           "RBC/City National"
    //         ],
    //         datasets: [
    //           {
    //             label: "Synergy %",
    //             data: [54, 35, 22, 18, 14, 13, 13]
    //           }
    //         ]
    //       },
    //       options: {
    //         title: {
    //           display: true,
    //           text: "Total synergies vs. precedent median"
    //         },
    //         baseline: 18
    //       }
    //     }
    //   };
    // }

    // if (lowerText.includes("synergyTable")) {
    //   data = await apiCall("POST", { message: lowerText, id: "xxxx" });
    //   return data.content as Partial<MessageType>;
    //   return {
    //     isList: true,
    //     listData: [
    //       {
    //         metric: "Footprint consolidation",
    //         detail: "39% of target branches are within 10km",
    //         rating: "HIGH"
    //       },
    //       {
    //         metric: "Overhead rationalization",
    //         detail: "54% of country organizations overlap",
    //         rating: "HIGH"
    //       },
    //       {
    //         metric: "IT Infrastructure savings",
    //         detail: "Both firms run on Temenos platform",
    //         rating: "HIGH"
    //       },
    //       {
    //         metric: "Cross‑selling potential",
    //         detail: "Adds 25 new local markets (16M consumers)",
    //         rating: "MEDIUM"
    //       },
    //       {
    //         metric: "Total synergies",
    //         detail: "Above median of 18% of target revenue",
    //         rating: "HIGH"
    //       }
    //     ]
    //   };
    // }

    // if (lowerText.includes("tree") || lowerText.includes("hierarchy")) {
    //   return {
    //     isTree: true
    //   };
    // }
    // if (lowerText.includes("map")) {
    //   return {
    //     isMap: true
    //   };
    // }
    // if (lowerText.includes("table") || lowerText.includes("grid")) {
    //   return {
    //     isTable: true,
    //     tableData: {
    //       columns: [
    //         "Consolidation targets",
    //         "Branch overlap within 3km",
    //         "No. of branches"
    //       ],
    //       rows: [
    //         ["Bäckerei Theurer", "100%", "19"],
    //         ["Backparadies Hug", "100%", "15"],
    //         ["Bäckerei Otto Schall", "94%", "31"],
    //         ["Rieglers Bäckerei", "93%", "14"],
    //         ["Bäckerei Rutz", "74%", "23"]
    //       ]
    //     }
    //   };
    // }
    return result;
  }
  if (text.includes("modal") || text.includes("popup")) {
    return {
      isModal: true
    };
  }
  // if (text.includes("card") || text.includes("reference")) {
  //   return {
  //     isCitation: true
  //   };
  // }
  // Default to text message if no specific type is detected
  return {
    isText: true
  };
};
