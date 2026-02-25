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
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const avgCol = getColor(avgScore);

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(2,5,14,0.9)",
        backdropFilter: "blur(18px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 680, maxHeight: "90vh",
        display: "flex", flexDirection: "column",
        background: "#080F1E",
        border: `1px solid ${avgCol}25`,
        borderRadius: 24, overflow: "hidden",
        boxShadow: `0 0 0 1px ${avgCol}10, 0 40px 100px rgba(0,0,0,0.75)`,
        animation: "scaleIn 0.25s ease",
      }}>

        {/* Top accent */}
        <div style={{
          height: 2, flexShrink: 0,
          background: `linear-gradient(90deg, transparent 0%, ${avgCol} 40%, ${avgCol} 60%, transparent 100%)`,
        }} />

        {/* Header */}
        <div style={{
          padding: "26px 30px 20px",
          borderBottom: "1px solid rgba(30,58,95,0.4)",
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            <div style={{
              display: "inline-flex", padding: "3px 12px", borderRadius: 6,
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              fontSize: 10, fontFamily: "'Space Grotesk', sans-serif",
              color: "#F59E0B", fontWeight: 700, letterSpacing: "0.1em",
              marginBottom: 12,
            }}>
              SUB-CLIENT
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800, fontSize: 22,
              color: "#F1F5F9", lineHeight: 1.2, margin: "0 0 8px",
            }}>
              {company}
            </h2>
            <p style={{ color: "#334155", fontSize: 13, margin: 0 }}>
              {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} &nbsp;·&nbsp;
              Avg score:{" "}
              <span style={{
                color: avgCol, fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
              }}>
                {avgScore.toFixed(1)}/100
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#0D1526", border: "1px solid #1E3A5F",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#334155", flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#F1F5F9"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#334155"; e.currentTarget.style.borderColor = "#1E3A5F"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 3 stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1, background: "rgba(30,58,95,0.25)",
          margin: "20px 30px 0",
          borderRadius: 14, overflow: "hidden", flexShrink: 0,
        }}>
          {[
            { label: "Total Score", value: totalScore.toFixed(1), color: "#F59E0B" },
            { label: "Vehicles",    value: vehicles.length,        color: "#60A5FA" },
            { label: "Avg / 100",   value: avgScore.toFixed(1),    color: avgCol   },
          ].map(s => (
            <div key={s.label} style={{
              background: "#080F1E", padding: "16px 12px", textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800, fontSize: 26, color: s.color,
              }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#1E3A5F", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Vehicle list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 30px 30px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {vehicles.map((v, idx) => {
              const c   = getColor(v.score);
              const pct = Math.min(v.score, 100);

              return (
                <div key={v.vehicleNumber + idx} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 18px",
                  background: "#0D1526",
                  border: "1px solid rgba(30,58,95,0.4)",
                  borderRadius: 12,
                  animation: `slideUp 0.3s ease ${Math.min(idx * 18, 300)}ms both`,
                }}>
                  {/* Rank */}
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11, color: "#1E3A5F",
                    width: 22, textAlign: "right", flexShrink: 0, fontWeight: 700,
                  }}>{idx + 1}</span>

                  <Car size={13} color="#1E3A5F" style={{ flexShrink: 0 }} />

                  {/* Vehicle number */}
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13, fontWeight: 600,
                    color: "#94A3B8",
                    width: 150, flexShrink: 0,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }} title={v.vehicleNumber}>
                    {v.vehicleNumber}
                  </span>

                  {/* Bar */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 4, background: "rgba(30,58,95,0.5)",
                      borderRadius: 99, overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%", width: `${pct}%`,
                        background: `linear-gradient(90deg, ${c}60, ${c})`,
                        borderRadius: 99,
                        boxShadow: `0 0 6px ${c}40`,
                      }} />
                    </div>
                  </div>

                  {/* Score */}
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 14, fontWeight: 700,
                    color: c, flexShrink: 0,
                    textAlign: "right", minWidth: 80,
                  }}>
                    {v.score.toFixed(1)}
                    <span style={{ fontSize: 11, color: "#1E3A5F", fontWeight: 500 }}>/100</span>
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
```

---

## ✅ GitHub pe in 5 files replace karo:

| File | Action |
|---|---|
| `app/globals.css` | Replace |
| `app/layout.js` | Replace |
| `app/page.js` | Replace |
| `components/Dashboard.jsx` | Replace |
| `components/ScoreCard.jsx` | Replace |
| `components/VehicleModal.jsx` | Replace |

Aur `cautio_shield.webp` logo file GitHub repo ke **root** mein `public/` folder mein honi chahiye:
```
public/
  cautio_shield.webp   ← ye file yahan rakho
