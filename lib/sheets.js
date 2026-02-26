export async function fetchSheetCSV(sheetId, gid) {
  const url = "https://docs.google.com/spreadsheets/d/" + sheetId + "/export?format=csv&gid=" + gid;
  const res = await fetch(url, { cache: "no-store", headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error("Sheet fetch failed [" + sheetId + " gid=" + gid + "]: HTTP " + res.status);
  return parseCSV(await res.text());
}

function parseCSV(text) {
  const lines = [];
  let cur = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (inQ && text[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === "\n" && !inQ) { lines.push(cur); cur = ""; }
    else if (c !== "\r") cur += c;
  }
  if (cur) lines.push(cur);
  if (!lines.length) return [];
  const headers = splitLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const vals = splitLine(line);
    const row = {};
    headers.forEach((h, idx) => { row[h.trim()] = (vals[idx] || "").trim(); });
    rows.push(row);
  }
  return rows;
}

function splitLine(line) {
  const parts = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === "," && !inQ) { parts.push(cur); cur = ""; }
    else cur += c;
  }
  parts.push(cur);
  return parts;
}
