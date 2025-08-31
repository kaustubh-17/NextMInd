import React from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function ReturnsTable({ monthlyMatrix }) {
  const years = Object.keys(monthlyMatrix).sort();
  return (
    <div className="overflow-auto rounded-2xl border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="text-left px-4 py-3 font-semibold">Year</th>
            {MONTHS.map(m => (
              <th key={m} className="text-right px-3 py-3 font-semibold">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {years.map(y => (
            <tr key={y} className="border-t">
              <td className="px-4 py-2 font-medium">{y}</td>
              {MONTHS.map(m => {
                const v = monthlyMatrix[y]?.[m];
                const txt = v === undefined || v === null ? "—" : `${v.toFixed(2)}%`;
                const color = v === undefined || v === null ? "" : (v >= 0 ? "text-green-700" : "text-red-700");
                return <td key={m} className={"px-3 py-2 text-right " + color}>{txt}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
