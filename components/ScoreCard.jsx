"use client";

import { useState } from "react";
import { ChevronRight, Bus, AlertCircle } from "lucide-react";
import VehicleModal from "./VehicleModal";

function scoreColor(pct) {
  if (pct >= 70) return "#22C55E";
  if (pct >= 40) return "#F59E0B";
  return "#EF4444";
}

function scoreLabel(pct) {
  if (pct >= 70) return "Good";
  if (pct >= 40) return "Fair";
  return "Low";
}

export default function ScoreCard({ company, rank, maxScore, isOther = false }) {
  const [open, setOpen] = useState(false);

  const pct      = maxScore > 0 ? Math.min((company.totalScore / maxScore) * 100, 100) : 0;
  const avgScore = company.vehicleCount > 0 ? company.totalScore / company.vehicleCount : 0;
  const color    = isOther ? "#64748B" : scoreColor(pct);

  return (
    <>
      <div
        className={`score-card animate-slideUp ${isOther ? "other-card" : ""}`}
        onClick={() => setOpen(true)}
        style={{ animationDelay: `${(rank || 0) * 40}ms` }}
      >
        {/* Glow blob */}
        {!isOther && (
          <div style={{
            position: "absolute", top: -20, right: -20,
            width: 120, height: 120, borderRadius: "50%",
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        {/* Rank badge */}
        {rank && !isOther && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            width: 26, height: 26, borderRadius: 8,
            background: rank <= 3 ? "rgba(245,158,11,0.12)" : "#0A1626",
            border: rank <= 3 ? "1px solid rgba(245,158,11,0.35)" : "1px solid #1A2D4A",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
            color: rank <= 3 ? "#F59E0B" : "#3D5270",
          }}>
            {rank}
          </div>
        )}

        {/* Icon + Name */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18, paddingRight: rank ? 32 : 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: isOther ? "rgba(71,85,105,0.15)" : "rgba(245,158,11,0.1)",
            border: isOther ? "1px solid #1A2D4A" : "1px solid rgba(245,158,11,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {isOther ? <AlertCircle size={18} color="#64748B" /> : <Bus size={18} color="#F59E0B" />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
              color: isOther ? "#64748B" : "#E2E8F0", lineHeight: 1.3,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }} title={company.company}>
              {company.company}
            </div>
            <div style={{ fontSize: 12, color: "#3D5270", marginTop: 2 }}>
              {company.vehicleCount} vehicle{company.vehicleCount !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Score */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 32, color, lineHeight: 1,
            }}>
              {company.totalScore.toFixed(1)}
            </span>
            {!isOther && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                padding: "3px 8px", borderRadius: 6,
                background: `${color}15`, border: `1px solid ${color}30`,
                color, fontWeight: 600, letterSpacing: "0.04em",
              }}>
                {scoreLabel(pct)}
              </span>
            )}
          </div>
          <div className="score-bar-track">
            <div
              className="score-bar-fill"
              style={{
                "--bar-width": `${pct}%`,
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${color}90, ${color})`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 14, borderTop: "1px solid #1A2D4A",
        }}>
          <span style={{ fontSize: 12, color: "#3D5270" }}>
            Avg:{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#5A7A9A" }}>
              {avgScore.toFixed(1)}
            </span>
            {" "}/ vehicle
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            color: isOther ? "#475569" : "#F59E0B",
            fontSize: 12, fontWeight: 500,
          }}>
            View all <ChevronRight size={13} />
          </div>
        </div>
      </div>

      {open && (
        <VehicleModal
          company={company.company}
          vehicles={company.vehicles}
          totalScore={company.totalScore}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
