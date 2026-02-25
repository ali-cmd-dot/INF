import { fetchSheetCSV } from "@/lib/sheets";
import Dashboard from "@/components/Dashboard";

const SHEET1_ID  = process.env.SHEET1_ID;
const SHEET1_GID = process.env.SHEET1_GID;
const SHEET2_ID  = process.env.SHEET2_ID;
const SHEET2_GID = process.env.SHEET2_GID;

const VEH_HEADERS = [
  "Vehicle Number/Chassis Number",
  "VehicleNumber/ChassisNumberNO.",
  "Vehicle Number",
  "VehicleNumber",
  "Chassis Number",
];

const COMPANY_COL = "Running company/School";

async function getData() {
  try {
    if (!SHEET1_ID || !SHEET2_ID) {
      return { error: "Missing SHEET1_ID or SHEET2_ID environment variables." };
    }

    const [sheet1, sheet2] = await Promise.all([
      fetchSheetCSV(SHEET1_ID, SHEET1_GID),
      fetchSheetCSV(SHEET2_ID, SHEET2_GID),
    ]);

    const s2Headers = sheet2.length ? Object.keys(sheet2[0]) : [];
    const vehCol2 = s2Headers.find((h) =>
      VEH_HEADERS.some((v) => h.trim().toLowerCase() === v.toLowerCase())
    );
    if (!vehCol2) {
      return { error: `Vehicle column not found in Sheet 2. Found: ${s2Headers.join(" | ")}` };
    }

    const companyCol2 = s2Headers.find(
      (h) => h.trim().toLowerCase() === COMPANY_COL.toLowerCase()
    );
    if (!companyCol2) {
      return { error: `"${COMPANY_COL}" not found in Sheet 2. Found: ${s2Headers.join(" | ")}` };
    }

    const vehicleToCompany = new Map();
    for (const row of sheet2) {
      const veh = (row[vehCol2] || "").trim().toUpperCase().replace(/\s+/g, "");
      const co  = (row[companyCol2] || "").trim();
      if (veh && co) vehicleToCompany.set(veh, co);
    }

    const s1Headers = sheet1.length ? Object.keys(sheet1[0]) : [];
    const vehCol1 =
      s1Headers.find((h) => h.trim().toLowerCase() === "vehicle number") ||
      s1Headers.find((h) => h.toLowerCase().includes("vehicle"));

    const scoreCol =
      s1Headers.find((h) => h.trim().toLowerCase() === "scores") ||
      s1Headers.find((h) => h.trim().toLowerCase() === "score") ||
      null;

    if (!vehCol1) {
      return { error: `"Vehicle Number" not found in Sheet 1. Found: ${s1Headers.join(" | ")}` };
    }

    const companyMap = new Map();

    for (const row of sheet1) {
      const vehRaw = (row[vehCol1] || "").trim();
      if (!vehRaw) continue;

      const vehNorm = vehRaw.toUpperCase().replace(/\s+/g, "");
      const score   = scoreCol ? (parseFloat(row[scoreCol]) || 0) : 0;
      const company = vehicleToCompany.get(vehNorm) || "Other";

      if (!companyMap.has(company)) {
        companyMap.set(company, {
          company,
          totalScore: 0,
          vehicleCount: 0,
          vehicles: [],
        });
      }

      const entry = companyMap.get(company);
      entry.totalScore   += score;
      entry.vehicleCount += 1;
      entry.vehicles.push({ vehicleNumber: vehRaw, score });
    }

    const companies = Array.from(companyMap.values());

    for (const c of companies) {
      c.avgScore   = c.vehicleCount > 0 ? c.totalScore / c.vehicleCount : 0;
      c.totalScore = Math.round(c.totalScore * 100) / 100;
      c.vehicles.sort((a, b) => b.score - a.score);
    }

    companies.sort((a, b) => {
      if (a.company === "Other") return 1;
      if (b.company === "Other") return -1;
      return b.avgScore - a.avgScore;
    });

    const totalVehicles = sheet1.filter((r) => (r[vehCol1] || "").trim()).length;

    return { companies, totalVehicles };

  } catch (err) {
    console.error("getData error:", err);
    return { error: err.message || "Unknown error" };
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const data = await getData();
  return <Dashboard data={data} />;
}
