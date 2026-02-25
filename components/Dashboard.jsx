"use client";

import { useState, useMemo } from "react";
import {
  Search, RefreshCw, Shield,
  Building2, Car, TrendingUp, AlertCircle,
} from "lucide-react";
import ScoreCard from "./ScoreCard";

export default function Dashboard({ data }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");

  if (data?.error) {
    return (
      <div className="grid-bg min-h-screen flex items-center justify-center p-6">
        <div style={{
          background: "#0C1628",
          border: "1px solid rgba(239,68,68,0.35)",
          borderRadius: 20, padding: 40,
          maxWidth: 520, width: "100%", textAlign: "center",
        }}>
          <AlertCircle size={36} color="#EF4444" style={{ margin: "0 auto 16px" }} />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 18, color: "#E2E8F0", marginBottom: 10,
          }}>
            Data Load Error
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6 }}>
            {data.error}
          </p>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 16 }}>
            Make sure both Google Sheets are shared publicly
            (Share → Anyone with the link → Viewer).
          </p>
        </div>
      </div>
    );
  }

  const { companies = [], totalVehicles = 0 } = data || {};
  const mainCompanies = companies.filter((c) => c.company !== "Other");
  const otherCompany  = companies.find((c) => c.company === "Other") || null;

  const totalScore = mainCompanies.reduce((s, c) => s + c.totalScore, 0);
  const maxScore   = Math.max(...mainCompanies.map((c) => c.totalScore), 1);

  const displayed = useMemo(() => {
    let list = [...mainCompanies];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.company.toLowerCase().includes(q) ||
          c.vehicles.some((v) => v.vehicleNumber.toLowerCase().includes(q))
      );
    }
    if (sortBy === "score")  list.sort((a, b) => b.totalScore   - a.totalScore);
    if (sortBy === "name")   list.sort((a, b) => a.company.localeCompare(b.company));
    if (sortBy === "count")  list.sort((a, b) => b.vehicleCount - a.vehicleCount);
    return list;
  }, [mainCompanies, search, sortBy]);

  return (
    <div className="grid-bg min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-40">
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "12px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, background: "#F59E0B",
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <Shield size={18} color="#0A0F1C" />
            </div>
            <div>
              <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 15, color: "#E2E8F0", letterSpacing: "-0.02em",
              }}>
                CAUTIO
              </span>
              <span style={{ fontSize: 12, color: "#3D5270", marginLeft: 8 }}>
                Fleet Intelligence
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#3D5270" }}>
              Client:{" "}
              <span style={{ color: "#F59E0B", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
                Infants
              </span>
            </span>
            <button
              onClick={() => window.location.reload()}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 14px", background: "#0C1628",
                border: "1px solid #1A2D4A", borderRadius: 10,
                color: "#5A7A9A", fontSize: 12, cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#E2E8F0"; e.currentTarget.style.borderColor = "#2D4060"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#5A7A9A"; e.currentTarget.style.borderColor = "#1A2D4A"; }}
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 24px 60px" }}>
        {/* Title */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ marginBottom: 10 }}>
            <span className="chip" style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)", color: "#F59E0B",
            }}>
              FLEET SCORECARD
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 5vw, 44px)", color: "#E2E8F0",
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8,
          }}>
            Infants <span style={{ color: "#F59E0B" }}>Fleet</span>
          </h1>
          <p style={{ color: "#3D5270", fontSize: 14 }}>
            Vehicle score overview grouped by sub-client (Running company / School)
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12, marginBottom: 32,
        }}>
          {[
            { icon: Building2, label: "Sub-Clients",    value: mainCompanies.length,              color: "#60A5FA" },
            { icon: Car,       label: "Total Vehicles", value: totalVehicles,                     color: "#A78BFA" },
            { icon: TrendingUp,label: "Total Score",    value: totalScore.toFixed(1),             color: "#F59E0B" },
            { icon: AlertCircle,label:"Unmatched",      value: otherCompany?.vehicleCount || 0,   color: "#64748B" },
          ].map((s) => (
            <div key={s.label} className="stat-box animate-slideUp">
              <s.icon size={16} color={s.color} style={{ marginBottom: 10 }} />
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 26, color: "#E2E8F0", lineHeight: 1, marginBottom: 4,
              }}>
                {s.value}
              </div>
              <div style={{ color: "#3D5270", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Sort */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <Search size={15} color="#3D5270" style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            }} />
            <input
              className="search-input"
              type="text"
              placeholder="Search sub-client or vehicle number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { key: "score", label: "By Score" },
              { key: "count", label: "By Vehicles" },
              { key: "name",  label: "A – Z" },
            ].map((opt) => (
              <button
                key={opt.key}
                className={`sort-btn ${sortBy === opt.key ? "active" : ""}`}
                onClick={() => setSortBy(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {displayed.length === 0 && search ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#3D5270" }}>
            <Search size={32} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
            <p style={{ fontSize: 14 }}>No results for &quot;{search}&quot;</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16, marginBottom: 24,
          }}>
            {displayed.map((company, idx) => (
              <ScoreCard
                key={company.company}
                company={company}
                rank={idx + 1}
                maxScore={maxScore}
              />
            ))}
          </div>
        )}

        {/* Other / Unmatched */}
        {otherCompany && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: "#1A2D4A" }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#3D5270", letterSpacing: "0.08em", whiteSpace: "nowrap",
              }}>
                UNMATCHED VEHICLES — {otherCompany.vehicleCount}
              </span>
              <div style={{ flex: 1, height: 1, background: "#1A2D4A" }} />
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}>
              <ScoreCard company={otherCompany} rank={null} maxScore={maxScore} isOther />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 56, paddingTop: 24, borderTop: "1px solid #1A2D4A",
          display: "flex", justifyContent: "space-between",
          fontSize: 12, color: "#243450", flexWrap: "wrap", gap: 8,
        }}>
          <span>© 2024 Cautio · Fleet Intelligence Platform</span>
          <span>Live data from Google Sheets · Refreshed on every load</span>
        </div>
      </main>
    </div>
  );
}
