import React, { useState, useEffect } from "react";
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ margin: "0 0 5px 0", color: "#666" }}>{label}</p>
        <p style={{ margin: 0, color: "#00A3E0", fontWeight: "bold" }}>
          {`${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

const VerticalBarChart: React.FC<BarChartProps> = ({ data, options }) => {
  // Transform the data into the format expected by Recharts
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    if (data.labels) {
      setChartData(
        data.labels?.map((label, index) => ({
          name: label,
          value: data.datasets[0].data[index],
        }))
      );
    }
    console.log(chartData);
  }, [data]);

  const renderCustomizedLabel = (props: {
    x: number;
    y: number;
    payload: {
      value: string;
    };
    width: number;
  }) => {
    const { x, y, payload, width } = props;
    const words = payload.value.split(" ");
    const lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach((word: string) => {
      currentLine.push(word);
      if (currentLine.length === 1) {
        lines.push(currentLine.join(" "));
        currentLine = [];
      }
    });
    if (currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-40} y={-5} width={80} height={90}>
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
              wordBreak: "break-all",
              lineHeight: "1.3",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transform: "rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
            {lines.map((line, index) => (
              <div
                key={index}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {line}
              </div>
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
          y={-3}
          fill="#00A3E0"
          textAnchor="start"
          dominantBaseline="top"
          style={{ fontSize: "14px" }}
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
          margin={{ top: 20, right: 0, left: 0, bottom: 100 }}
          barGap={0}
          maxBarSize={100}
        >
          <XAxis
            dataKey="name"
            tick={renderCustomizedLabel}
            height={100}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
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
