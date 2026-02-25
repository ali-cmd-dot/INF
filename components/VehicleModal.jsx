"use client";

import { useEffect, useRef } from "react";
import { X, Car } from "lucide-react";

function scoreColor(score, max) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  if (pct >= 70) return "#22C55E";
  if (pct >= 40) return "#F59E0B";
  return "#EF4444";
}

export default function VehicleModal({ company, vehicles, totalScore, onClose }) {
  const maxScore = vehicles.length ? Math.max(...vehicles.map((v) => v.score), 0.01) : 1;
  const avgScore = vehicles.length ? totalScore / vehicles.length : 0;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className="animate-scaleIn"
        style={{
          width: "100%", maxWidth: 640, maxHeight: "88vh",
          display: "flex", flexDirection: "column",
          background: "#0C1628",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 22, overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(245,158,11,0.1), 0 24px 80px rgba(0,0,0,0.65)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "22px 24px 18px", borderBottom: "1px solid #1A2D4A",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            <div style={{ marginBottom: 6 }}>
              <span className="chip" style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B",
              }}>
                SUB-CLIENT
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 20, color: "#E2E8F0", lineHeight: 1.2, margin: 0,
            }}>
              {company}
            </h2>
            <p style={{ color: "#3D5270", fontSize: 13, marginTop: 4 }}>
              {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} &nbsp;·&nbsp;
              Avg:{" "}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F59E0B" }}>
                {avgScore.toFixed(1)}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: 10, background: "#0A1626",
              border: "1px solid #1A2D4A", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", color: "#5A7A9A",
              flexShrink: 0, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#E2E8F0"; e.currentTarget.style.background = "#162240"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5A7A9A"; e.currentTarget.style.background = "#0A1626"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1, background: "#1A2D4A",
          margin: "16px 24px", borderRadius: 14, overflow: "hidden", flexShrink: 0,
        }}>
          {[
            { label: "Total Score", value: totalScore.toFixed(1), color: "#F59E0B" },
            { label: "Vehicles",    value: vehicles.length,       color: "#60A5FA" },
            { label: "Average",     value: avgScore.toFixed(1),   color: "#34D399" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#0C1628", padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "#3D5270", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Vehicle list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {vehicles.map((v, idx) => {
              const c    = scoreColor(v.score, maxScore);
              const barW = maxScore > 0 ? (v.score / maxScore) * 100 : 0;

              return (
                <div
                  key={v.vehicleNumber + idx}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", background: "#081120",
                    border: "1px solid #1A2D4A", borderRadius: 13,
                    animation: `slideUp 0.3s ease ${idx * 25}ms both`,
                  }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: "#243450", width: 22, textAlign: "right", flexShrink: 0,
                  }}>
                    {idx + 1}
                  </span>
                  <Car size={14} color="#243450" style={{ flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                    color: "#94A3B8", width: 140, flexShrink: 0,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }} title={v.vehicleNumber}>
                    {v.vehicleNumber}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div className="score-bar-track">
                      <div
                        className="score-bar-fill"
                        style={{
                          "--bar-width": `${barW}%`,
                          width: `${barW}%`,
                          background: `linear-gradient(90deg, ${c}80, ${c})`,
                          animationDelay: `${idx * 40}ms`,
                        }}
                      />
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                    fontWeight: 600, color: c, width: 48, textAlign: "right", flexShrink: 0,
                  }}>
                    {v.score.toFixed(1)}
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
