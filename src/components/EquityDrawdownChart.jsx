import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const EquityDrawdownChart = ({ navSeries, drawdownSeries }) => {
  // Merge navSeries + drawdownSeries into one dataset for plotting
  const mergedData = navSeries.map((d, i) => ({
    date: d.date.toISOString().split("T")[0],
    equity: d.equity,
    drawdown: drawdownSeries[i]?.dd ?? null,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={mergedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis yAxisId="left" label={{ value: "Equity (Index)", angle: -90, position: "insideLeft" }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: "Drawdown (%)", angle: -90, position: "insideRight" }} />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="equity" stroke="#8884d8" dot={false} name="Equity Curve" />
        <Line yAxisId="right" type="monotone" dataKey="drawdown" stroke="#ff7300" dot={false} name="Drawdown" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EquityDrawdownChart;
