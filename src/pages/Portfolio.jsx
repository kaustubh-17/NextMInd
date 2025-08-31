import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import reportFile from "../assets/report.xlsx"; 

const PortfolioPage = () => {
  const [monthlyReturns, setMonthlyReturns] = useState([]);
  const [chartData, setChartData] = useState([]);

  
  const parseExcelDate = (str) => {
    const [day, month, year] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const fetchExcel = async () => {
      try {
        const response = await fetch(reportFile);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      
        const rows = data.slice(1);

      
        const parsed = rows
          .filter((row) => row[0] && row[1]) // ignore empty rows
          .map((row) => ({
            date: parseExcelDate(row[0].toString()),
            nav: parseFloat(row[1]),
          }));

       
        parsed.sort((a, b) => a.date - b.date);

      
        let peak = -Infinity;
        const chartFormatted = parsed.map((p) => {
          peak = Math.max(peak, p.nav);
          return {
            date: p.date.toISOString().split("T")[0], // yyyy-mm-dd
            nav: p.nav,
            drawdown: ((p.nav / peak) - 1) * 100,
          };
        });

        setChartData(chartFormatted);

      
        const monthly = {};
        parsed.forEach((p) => {
          const ym = `${p.date.getFullYear()}-${String(
            p.date.getMonth() + 1
          ).padStart(2, "0")}`;
          if (!monthly[ym]) {
            monthly[ym] = { first: p.nav, last: p.nav };
          } else {
            monthly[ym].last = p.nav;
          }
        });

        const monthlyRows = Object.entries(monthly).map(([month, val]) => {
          const ret = ((val.last / val.first) - 1) * 100;
          return { month, return: ret.toFixed(2) + "%" };
        });

        setMonthlyReturns(monthlyRows);
      } catch (err) {
        console.error("❌ Error reading Excel:", err);
      }
    };

    fetchExcel();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">NextMind Portfolio</h1>

     
      <div className="bg-white rounded-2xl shadow p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">📊 Monthly Returns</h2>
        <div className="max-h-64 overflow-y-auto border rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Month</th>
                <th className="border border-gray-300 p-2">Return</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReturns.length > 0 ? (
                monthlyReturns.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{row.month}</td>
                    <td className="border border-gray-300 p-2">{row.return}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-2 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">📈 Portfolio Performance</h2>

      
<ResponsiveContainer width="100%" height={400}>
  <LineChart
    data={chartData}
    margin={{ top: 30, right: 30, bottom: 20, left: 0 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip formatter={(val) => val.toFixed(2)} labelFormatter={(d) => `Date: ${d}`} />
    <Legend />
    <Line type="monotone" dataKey="nav" stroke="#2563eb" strokeWidth={2} dot={false} name="NAV" />
  </LineChart>
</ResponsiveContainer>


      
       <ResponsiveContainer width="100%" height={200} className="mt-6">
  <AreaChart data={chartData}>
    <defs>
      <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip formatter={(val) => val.toFixed(2) + "%"} labelFormatter={(d) => `Date: ${d}`} />
    <Area
      type="monotone"
      dataKey="drawdown"
      stroke="#dc2626"
      fillOpacity={1}
      fill="url(#colorDrawdown)"
      name="Drawdown"
    />
  </AreaChart>
</ResponsiveContainer>

      </div>
    </div>
  );
};

export default PortfolioPage;
