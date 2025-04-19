import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";

const data = [
  { name: "Hitachi / Global Logic", value: 37.4 },
  { name: "Atos / Data Respons", value: 19.1 },
  { name: "Adecco / Akka", value: 14.7 },
  { name: "Capgem. Altran", value: 8.3 },
  { name: "Alten / Xelia", value: 12.3 },
  { name: "Alten / Accent", value: 10.6 },
  { name: "Cognizant / Devicon", value: 9.8 },
  { name: "KKR / Ness", value: 8.3 },
];

const VerticalBarChart = () => {
  // Calculate middle value from the data
  const calculateMiddleValue = (data: { value: number }[]) => {
    const values = data.map((item) => item.value);
    const sortedValues = [...values].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedValues.length / 2);
    return sortedValues[middleIndex];
  };

  const middleValue = calculateMiddleValue(data);

  const renderCustomizedLabel = (props: any) => {
    const { x, y, payload, width } = props;
    const words = payload.value.split(" ");
    const lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach((word: string) => {
      currentLine.push(word);
      if (currentLine.length === 2) {
        lines.push(currentLine.join(" "));
        currentLine = [];
      }
    });
    if (currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-width / 2} y={0} width={width} height={60}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "12px",
              color: "#666",
              wordBreak: "break-word",
            }}
          >
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </foreignObject>
      </g>
    );
  };

  const renderValueLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={-5}
          fill="#00A3E0"
          textAnchor="start"
          dominantBaseline="top"
          style={{ fontSize: "12px" }}
        >
          {`${value}x`}
        </text>
      </g>
    );
  };

  return (
    <div style={{ height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 80 }}
          barGap={0}
          maxBarSize={100}
        >
          <XAxis
            dataKey="name"
            tick={renderCustomizedLabel}
            height={60}
            interval={0}
            axisLine={false}
            tickLine={false}
          />

          <Bar
            dataKey="value"
            fill="#00A3E0"
            animationDuration={3000}
            animationBegin={0}
            barSize={100}
            label={renderValueLabel}
          />
          <ReferenceLine y={middleValue} stroke="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChart;
