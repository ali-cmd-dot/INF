"use client";

import { useState } from "react";
import { ChevronRight, Bus, AlertCircle } from "lucide-react";
import VehicleModal from "./VehicleModal";

function getStyle(score) {
  if (score >= 80) return { color: "#22C55E", border: "rgba(34,197,94,0.25)",  bg: "rgba(34,197,94,0.08)",  label: "Excellent" };
  if (score >= 60) return { color: "#F59E0B", border: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.08)", label: "Good"      };
  if (score >= 40) return { color: "#F97316", border: "rgba(249,115,22,0.25)", bg: "rgba(249,115,22,0.08)", label: "Fair"      };
  return              { color: "#EF4444", border: "rgba(239,68,68,0.25)",  bg: "rgba(239,68,68,0.08)",  label: "Low"       };
}

export default function ScoreCard({ company, rank, isOther }) {
  const [modalOpen, setModalOpen] = useState(false);

  const avgScore  = company.avgScore || 0;
  const s         = isOther ? { color: "#475569", border: "rgba(71,85,105,0.2)", bg: "rgba(71,85,105,0.07)", label: "N/A" } : getStyle(avgScore);
  const pct       = Math.min(avgScore, 100);
  const shortName = company.company.length > 24 ? company.company.slice(0, 24) + "…" : company.company;

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setModalOpen(true); }}
        style={{
          background: "#0C1525",
          border: isOther ? "1px dashed #1A3050" : "1px solid " + s.border,
          borderRadius: 20, padding: "24px", cursor: "pointer",
          position: "relative", overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          userSelect: "none", outline: "none",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = isOther ? "0 16px 48px rgba(0,0,0,0.4)" : "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px " + s.color + "18";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {!isOther && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent," + s.color + "80,transparent)" }} />}

        {rank && !isOther && (
          <div style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 9, background: rank <= 3 ? "rgba(245,158,11,0.12)" : "rgba(26,48,80,0.5)", border: rank <= 3 ? "1px solid rgba(245,158,11,0.45)" : "1px solid #1A3050", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: rank <= 3 ? "#F59E0B" : "#2D4A6A" }}>
            #{rank}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22, paddingRight: 42 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: s.bg, border: "1px solid " + s.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {isOther ? <AlertCircle size={20} color={s.color} /> : <Bus size={20} color={s.color} />}
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
            <div title={company.company} style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: isOther ? "#475569" : "#E8EEF6", lineHeight: 1.3, marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {shortName}
            </div>
            <div style={{ fontSize: 12, color: "#2D4A6A" }}>{company.vehicleCount} vehicle{company.vehicleCount !== 1 ? "s" : ""}</div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: "-0.04em", color: s.color }}>{avgScore.toFixed(1)}</span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: 20, color: "#2D4A6A", lineHeight: 1.5 }}>/100</span>
              </div>
              <div style={{ fontSize: 12, color: "#2D4A6A", marginTop: 4 }}>Avg score per vehicle</div>
            </div>
            {!isOther && (
              <div style={{ padding: "6px 14px", borderRadius: 8, background: s.bg, border: "1px solid " + s.border, fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: "0.05em" }}>
                {s.label}
              </div>
            )}
          </div>
          <div style={{ height: 5, background: "rgba(26,48,80,0.6)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: pct + "%", borderRadius: 99, background: isOther ? "#1A3050" : "linear-gradient(90deg," + s.color + "60," + s.color + ")", boxShadow: isOther ? "none" : "0 0 8px " + s.color + "50", transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(26,48,80,0.6)" }}>
          <span style={{ fontSize: 13, color: "#2D4A6A" }}>Total: <span style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#3D5A7A", fontWeight: 600 }}>{company.totalScore.toFixed(1)}</span></span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: isOther ? "#3D5A7A" : s.color }}>
            View all <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {modalOpen && (
        <VehicleModal
          company={company.company}
          vehicles={company.vehicles}
          totalScore={company.totalScore}
          avgScore={avgScore}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
