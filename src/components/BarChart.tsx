import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";

interface BarChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
  options?: {
    title?: {
      display: boolean;
      text: string;
    };
    baseline?: number;
  };
}

const VerticalBarChart: React.FC<BarChartProps> = ({ data, options }) => {
  // Transform the data into the format expected by Recharts

  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0].data[index],
  }));

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
          {`${value}%`}
        </text>
      </g>
    );
  };

  return (
    <div style={{ height: 350 }}>
      {options?.title?.display && (
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          {options.title.text}
        </h3>
      )}
      <ResponsiveContainer>
        <RechartsBarChart
          data={chartData}
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
          {options?.baseline !== undefined && (
            <ReferenceLine y={options.baseline} stroke="#000000" />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChart;
