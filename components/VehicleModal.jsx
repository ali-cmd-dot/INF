"use client";

import { useEffect } from "react";
import { X, Car } from "lucide-react";

function getColor(score) {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  if (score >= 40) return "#F97316";
  return "#EF4444";
}

export default function VehicleModal({ company, vehicles, totalScore, avgScore, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return function() {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const avgCol = getColor(avgScore);

  return (
    <div
      onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(2,5,14,0.92)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}
    >
      <div style={{ width: "100%", maxWidth: 680, maxHeight: "90vh", display: "flex", flexDirection: "column", background: "#080F1E", border: "1px solid " + avgCol + "30", borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px " + avgCol + "10", animation: "scaleIn 0.22s ease" }}>

        {/* Top line */}
        <div style={{ height: 2, flexShrink: 0, background: "linear-gradient(90deg,transparent," + avgCol + " 40%," + avgCol + " 60%,transparent)" }} />

        {/* Header */}
        <div style={{ padding: "24px 28px 18px", borderBottom: "1px solid rgba(26,48,80,0.5)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ display: "inline-flex", padding: "3px 12px", borderRadius: 6, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 10, fontFamily: "'Space Grotesk',sans-serif", color: "#F59E0B", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>SUB-CLIENT</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 22, color: "#E8EEF6", lineHeight: 1.2, margin: "0 0 8px" }}>{company}</h2>
            <p style={{ color: "#2D4A6A", fontSize: 13, margin: 0 }}>
              {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}{" · "}
              Avg: <span style={{ color: avgCol, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>{avgScore.toFixed(1)}/100</span>
            </p>
          </div>
          <button onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: 10, background: "#0C1525", border: "1px solid #1A3050", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#2D4A6A", flexShrink: 0, transition: "all 0.2s" }}
            onMouseEnter={function(e) { e.currentTarget.style.color = "#E8EEF6"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.color = "#2D4A6A"; e.currentTarget.style.borderColor = "#1A3050"; }}>
            <X size={16} />
          </button>
        </div>

        {/* 3 stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(26,48,80,0.3)", margin: "18px 28px 0", borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
          {[
            { label: "Total Score", value: totalScore.toFixed(1), color: "#F59E0B" },
            { label: "Vehicles",    value: vehicles.length,        color: "#60A5FA" },
            { label: "Avg / 100",   value: avgScore.toFixed(1),    color: avgCol   },
          ].map(function(s) {
            return (
              <div key={s.label} style={{ background: "#080F1E", padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 24, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#1A3050", marginTop: 4 }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Vehicle list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 28px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
            {vehicles.map(function(v, idx) {
              var c   = getColor(v.score);
              var pct = Math.min(v.score, 100);
              var delay = Math.min(idx * 15, 250);
              return (
                <div key={v.vehicleNumber + idx}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: "#0C1525", border: "1px solid rgba(26,48,80,0.5)", borderRadius: 11, animation: "slideUp 0.28s ease " + delay + "ms both" }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, color: "#1A3050", width: 22, textAlign: "right", flexShrink: 0, fontWeight: 700 }}>{idx + 1}</span>
                  <Car size={12} color="#1A3050" style={{ flexShrink: 0 }} />
                  <span title={v.vehicleNumber} style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "#94A3B8", width: 140, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.vehicleNumber}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 4, background: "rgba(26,48,80,0.6)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg," + c + "60," + c + ")", borderRadius: 99, boxShadow: "0 0 5px " + c + "40" }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: c, flexShrink: 0, textAlign: "right", minWidth: 76 }}>
                    {v.score.toFixed(1)}<span style={{ fontSize: 10, color: "#1A3050", fontWeight: 400 }}>/100</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
