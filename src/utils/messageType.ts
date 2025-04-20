import { MessageType } from "../App";

export const determineMessageType = (text: string): Partial<MessageType> => {
  const lowerText = text.toLowerCase();

  // Check for specific keywords to determine message type
  if (lowerText.includes("chart") || lowerText.includes("graph")) {
    return {
      isChart: true,
      chartData: {
        data: {
          labels: [
            "UBS/Credit",
            "Julius Bär",
            "EFG/BSI",
            "Rathbones",
            "Rothschild",
            "ABN Amro",
            "RBC/City National"
          ],
          datasets: [
            {
              label: "Synergy %",
              data: [54, 35, 22, 18, 14, 13, 13]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Total synergies vs. precedent median"
          },
          baseline: 18
        }
      }
    };
  }

  if (lowerText.includes("list") || lowerText.includes("metrics")) {
    return {
      isList: true,
      listData: [
        {
          metric: "Footprint consolidation",
          detail: "39% of target branches are within 10km",
          rating: "HIGH"
        },
        {
          metric: "Overhead rationalization",
          detail: "54% of country organizations overlap",
          rating: "HIGH"
        },
        {
          metric: "IT Infrastructure savings",
          detail: "Both firms run on Temenos platform",
          rating: "HIGH"
        },
        {
          metric: "Cross‑selling potential",
          detail: "Adds 25 new local markets (16M consumers)",
          rating: "MEDIUM"
        },
        {
          metric: "Total synergies",
          detail: "Above median of 18% of target revenue",
          rating: "HIGH"
        }
      ]
    };
  }

  if (lowerText.includes("modal") || lowerText.includes("popup")) {
    return {
      isModal: true
    };
  }

  if (lowerText.includes("tree") || lowerText.includes("hierarchy")) {
    return {
      isTree: true
    };
  }
  if (lowerText.includes("map")) {
    return {
      isMap: true
    };
  }
  if (lowerText.includes("table") || lowerText.includes("grid")) {
    return {
      isTable: true,
      tableData: {
        columns: [
          "Consolidation targets",
          "Branch overlap within 3km",
          "No. of branches"
        ],
        rows: [
          ["Bäckerei Theurer", "100%", "19"],
          ["Backparadies Hug", "100%", "15"],
          ["Bäckerei Otto Schall", "94%", "31"],
          ["Rieglers Bäckerei", "93%", "14"],
          ["Bäckerei Rutz", "74%", "23"]
        ]
      }
    };
  }

  if (lowerText.includes("card") || lowerText.includes("reference")) {
    return {
      isCitation: true
    };
  }

  // Default to text message if no specific type is detected
  return {
    isText: true
  };
};
