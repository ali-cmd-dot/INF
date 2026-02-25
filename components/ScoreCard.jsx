"use client";

import { useState } from "react";
import { ChevronRight, Bus, AlertCircle } from "lucide-react";
import VehicleModal from "./VehicleModal";

function getStyle(score) {
  if (score >= 80) return { color: "#22C55E", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.2)",   label: "Excellent" };
  if (score >= 60) return { color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  label: "Good"      };
  if (score >= 40) return { color: "#F97316", bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.2)",  label: "Fair"      };
  return              { color: "#EF4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)",   label: "Low"       };
}

export default function ScoreCard({ company, rank, isOther = false }) {
  const [open, setOpen] = useState(false);

  // avgScore is already computed in page.js
  const avgScore = company.avgScore || 0;
  const s = isOther
    ? { color: "#475569", bg: "rgba(71,85,105,0.06)", border: "rgba(71,85,105,0.15)", label: "N/A" }
    : getStyle(avgScore);

  const pct = Math.min(avgScore, 100);
  const shortName = company.company.length > 24 ? company.company.slice(0, 24) + "…" : company.company;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          background: "#0D1526",
          border: `1px solid ${s.border}`,
          borderStyle: isOther ? "dashed" : "solid",
          borderRadius: 20, padding: "24px 24px 20px",
          cursor: "pointer", position: "relative", overflow: "hidden",
          transition: "transform 0.22s ease, box-shadow 0.22s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = isOther
            ? "0 16px 48px rgba(0,0,0,0.35)"
            : `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${s.color}20`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Top glow line */}
        {!isOther && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent 0%, ${s.color}70 50%, transparent 100%)`,
          }} />
        )}

        {/* Rank */}
        {rank && !isOther && (
          <div style={{
            position: "absolute", top: 16, right: 16,
            width: 28, height: 28, borderRadius: 8,
            background: rank <= 3 ? "rgba(245,158,11,0.12)" : "rgba(30,58,95,0.4)",
            border: rank <= 3 ? "1px solid rgba(245,158,11,0.4)" : "1px solid #1E3A5F",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12, fontWeight: 700,
            color: rank <= 3 ? "#F59E0B" : "#1E3A5F",
          }}>#{rank}</div>
        )}

        {/* Icon + Name */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 24, paddingRight: 40 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 13,
            background: s.bg, border: `1px solid ${s.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {isOther ? <AlertCircle size={20} color={s.color} /> : <Bus size={20} color={s.color} />}
          </div>
          <div style={{ paddingTop: 2, flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 15,
              color: isOther ? "#475569" : "#F1F5F9",
              lineHeight: 1.3, marginBottom: 5,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }} title={company.company}>
              {shortName}
            </div>
            <div style={{ fontSize: 12, color: "#1E3A5F" }}>
              {company.vehicleCount} vehicle{company.vehicleCount !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Score */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", marginBottom: 14,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: 46,
                  color: s.color, lineHeight: 1, letterSpacing: "-0.04em",
                }}>
                  {avgScore.toFixed(1)}
                </span>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500, fontSize: 20, color: "#1E3A5F", lineHeight: 1.4,
                }}>/100</span>
              </div>
              <div style={{ fontSize: 12, color: "#1E3A5F", marginTop: 4 }}>
                Avg score per vehicle
              </div>
            </div>
            {!isOther && (
              <div style={{
                padding: "6px 14px", borderRadius: 8,
                background: s.bg, border: `1px solid ${s.border}`,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11, fontWeight: 700, color: s.color,
                letterSpacing: "0.06em",
              }}>
                {s.label}
              </div>
            )}
          </div>

          {/* Bar */}
          <div style={{
            height: 5, background: "rgba(30,58,95,0.5)",
            borderRadius: 99, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: isOther ? "#1E3A5F" : `linear-gradient(90deg, ${s.color}60, ${s.color})`,
              borderRadius: 99,
              boxShadow: isOther ? "none" : `0 0 8px ${s.color}50`,
              transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 16, borderTop: "1px solid rgba(30,58,95,0.5)",
        }}>
          <span style={{ fontSize: 13, color: "#1E3A5F" }}>
            Total:{" "}
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#334155", fontWeight: 600,
            }}>
              {company.totalScore.toFixed(1)}
            </span>
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            color: isOther ? "#334155" : s.color,
            fontSize: 13, fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            View all <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {open && (
        <VehicleModal
          company={company.company}
          vehicles={company.vehicles}
          totalScore={company.totalScore}
          avgScore={avgScore}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
