import * as XLSX from "xlsx";

export async function loadPortfolioFromExcel(filePath = "/data/Front end Assignment Historical NAV Report.xlsx") {
  const res = await fetch(filePath);
  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json(ws, { header: 1 });

  let headerRow = -1;
  for (let i = 0; i < raw.length; i++) {
    const row = raw[i];
    if (!row) continue;
    if (String(row[0]).trim().toLowerCase().includes("nav date")) {
      headerRow = i;
      break;
    }
  }
  if (headerRow === -1) throw new Error("Could not find NAV header row in Excel.");

  const data = [];
  for (let i = headerRow + 1; i < raw.length; i++) {
    const row = raw[i];
    if (!row || row.length < 2) continue;
    const dt = row[0];
    const nav = parseFloat(row[1]);
    if (!dt || isNaN(nav)) continue;
    
    const [d, m, y] = String(dt).split("-").map((x) => parseInt(x, 10));
    const jsDate = new Date(y, m - 1, d);
    if (!isNaN(jsDate.getTime())) {
      data.push({ date: jsDate, nav });
    }
  }


  data.sort((a, b) => a.date - b.date);

  
  const start = data[0]?.nav ?? 100;
  const navSeries = data.map((d) => ({
    date: d.date,
    nav: d.nav,
    equity: (d.nav / start) * 100,
  }));

  
  let peak = -Infinity;
  const drawdownSeries = navSeries.map((d) => {
    if (d.equity > peak) peak = d.equity;
    const dd = ((d.equity - peak) / peak) * 100;
    return { date: d.date, dd };
  });

  
  const byMonth = new Map(); 
  for (const d of navSeries) {
    const key = `${d.date.getFullYear()}-${String(d.date.getMonth() + 1).padStart(2, "0")}`;
    byMonth.set(key, d.equity); 
  }
  const monthKeys = Array.from(byMonth.keys()).sort();
  const monthVals = monthKeys.map((k) => byMonth.get(k));
  const monthRets = [null]; 
  for (let i = 1; i < monthVals.length; i++) {
    const ret = ((monthVals[i] - monthVals[i - 1]) / monthVals[i - 1]) * 100;
    monthRets.push(ret);
  }


  const monthsAbbr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyMatrix = {};
  monthKeys.forEach((k, idx) => {
    const [y, m] = k.split("-").map(Number);
    const abbr = monthsAbbr[m - 1];
    monthlyMatrix[y] = monthlyMatrix[y] || {};
    monthlyMatrix[y][abbr] = monthRets[idx];
  });

  return { navSeries, drawdownSeries, monthlyMatrix };
}
