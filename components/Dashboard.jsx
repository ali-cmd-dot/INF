"use client";

import { useState, useMemo } from "react";
import { Search, RefreshCw, Building2, Car, TrendingUp, AlertCircle } from "lucide-react";
import ScoreCard from "./ScoreCard";

export default function Dashboard({ data }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");

  if (data && data.error) {
    return (
      <div style={{
        minHeight: "100vh", background: "#060B16",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}>
        <div style={{
          background: "#0C1525", border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 20, padding: 48, maxWidth: 500, width: "100%", textAlign: "center",
        }}>
          <AlertCircle size={40} color="#EF4444" style={{ display: "block", margin: "0 auto 16px" }} />
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: "#E8EEF6", marginBottom: 12 }}>
            Data Load Error
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7 }}>{data.error}</p>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 16 }}>
            Make sure both Google Sheets are shared publicly — Share → Anyone with the link → Viewer
          </p>
        </div>
      </div>
    );
  }

  const companies     = (data && data.companies)     || [];
  const totalVehicles = (data && data.totalVehicles) || 0;

  const mainCompanies = companies.filter((c) => c.company !== "Other");
  const otherCompany  = companies.find((c)  => c.company === "Other") || null;

  const overallAvg = totalVehicles > 0
    ? companies.reduce((s, c) => s + c.totalScore, 0) / totalVehicles
    : 0;

  const displayed = useMemo(() => {
    let list = mainCompanies.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.company.toLowerCase().includes(q) ||
        c.vehicles.some((v) => v.vehicleNumber.toLowerCase().includes(q))
      );
    }
    if (sortBy === "score") list.sort((a, b) => b.avgScore - a.avgScore);
    if (sortBy === "name")  list.sort((a, b) => a.company.localeCompare(b.company));
    if (sortBy === "count") list.sort((a, b) => b.vehicleCount - a.vehicleCount);
    return list;
  }, [mainCompanies, search, sortBy]);

  const AMBER  = "#F59E0B";
  const CARD   = "#0C1525";
  const BORDER = "#1A3050";

  return (
    <div style={{ minHeight: "100vh", background: "#060B16" }}>

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(6,11,22,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto", padding: "0 32px",
          height: 68, display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "linear-gradient(145deg,#F59E0B,#D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
              overflow: "hidden", flexShrink: 0,
            }}>
              <img
                src="/cautio_shield.webp"
                alt="Cautio"
                width={28} height={28}
                style={{ objectFit: "contain", display: "block" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML =
                    '<span style="font-family:Space Grotesk,sans-serif;font-weight:900;font-size:20px;color:#060B16">C</span>';
                }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 16, color: "#E8EEF6", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                CAUTIO
              </div>
              <div style={{ fontSize: 9, color: "#2D4A6A", letterSpacing: "0.12em", marginTop: 2 }}>
                FLEET INTELLIGENCE
              </div>
            </div>
          </div>

          {/* Center pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 20px", borderRadius: 99,
            background: "rgba(245,158,11,0.07)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }} />
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: AMBER }}>Infants</span>
            <span style={{ fontSize: 13, color: "#2D4A6A" }}>Fleet Dashboard</span>
          </div>

          {/* Refresh */}
          <button
            onClick={() => window.location.reload()}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 10,
              background: CARD, border: `1px solid ${BORDER}`,
              color: "#4A6A8A", fontSize: 13, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", flexShrink: 0, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#E8EEF6"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#4A6A8A"; e.currentTarget.style.borderColor = BORDER; }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "52px 32px 80px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center",
            padding: "4px 14px", borderRadius: 99, marginBottom: 20,
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
          }}>
            <span style={{ fontSize: 11, color: AMBER, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
              SCORECARD REPORT
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800,
            fontSize: "clamp(28px,4vw,48px)", color: "#E8EEF6",
            letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 12,
          }}>
            Fleet Performance{" "}
            <span style={{ background: "linear-gradient(135deg,#F59E0B,#FCD34D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Overview
            </span>
          </h1>
          <p style={{ color: "#2D4A6A", fontSize: 15 }}>
            Vehicle scores grouped by sub-client · Powered by Cautio
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 44 }}>
          {[
            { Icon: Building2,   label: "Sub-Clients",    value: mainCompanies.length,                          color: "#60A5FA", bdr: "rgba(96,165,250,0.2)"   },
            { Icon: Car,         label: "Total Vehicles", value: totalVehicles,                                  color: "#A78BFA", bdr: "rgba(167,139,250,0.2)"  },
            { Icon: TrendingUp,  label: "Fleet Avg /100", value: overallAvg.toFixed(1),                          color: AMBER,     bdr: "rgba(245,158,11,0.2)"   },
            { Icon: AlertCircle, label: "Unmatched",      value: otherCompany ? otherCompany.vehicleCount : 0,   color: "#475569", bdr: "rgba(71,85,105,0.15)"   },
          ].map(({ Icon, label, value, color, bdr }) => (
            <div key={label} style={{ background: CARD, border: `1px solid ${bdr}`, borderRadius: 16, padding: "22px 24px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon size={17} color={color} />
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 30, color: "#E8EEF6", lineHeight: 1, marginBottom: 6 }}>
                {value}
              </div>
              <div style={{ color: "#2D4A6A", fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search + Sort */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={15} color="#1A3050" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search sub-client or vehicle number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px 12px 44px",
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 12, color: "#E8EEF6", fontSize: 14,
                outline: "none", fontFamily: "'DM Sans',sans-serif",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; }}
              onBlur={(e)  => { e.target.style.borderColor = BORDER; }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { key: "score", label: "Best Score"    },
              { key: "count", label: "Most Vehicles" },
              { key: "name",  label: "A – Z"         },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setSortBy(opt.key)} style={{
                padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 500,
                cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
                background: sortBy === opt.key ? "rgba(245,158,11,0.1)"           : CARD,
                border:     sortBy === opt.key ? "1px solid rgba(245,158,11,0.4)" : `1px solid ${BORDER}`,
                color:      sortBy === opt.key ? AMBER                             : "#4A6A8A",
              }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {displayed.length === 0 && search.trim() ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: "#1A3050" }}>
            <Search size={40} style={{ display: "block", margin: "0 auto 14px", opacity: 0.3 }} />
            <p style={{ fontSize: 15 }}>No results for &quot;{search}&quot;</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20, marginBottom: 32 }}>
            {displayed.map((company, idx) => (
              <ScoreCard key={company.company} company={company} rank={idx + 1} />
            ))}
          </div>
        )}

        {/* Unmatched */}
        {otherCompany && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${BORDER})` }} />
              <span style={{ fontSize: 11, color: "#1A3050", letterSpacing: "0.1em", fontFamily: "'Space Grotesk',sans-serif", whiteSpace: "nowrap" }}>
                UNMATCHED VEHICLES ({otherCompany.vehicleCount})
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${BORDER},transparent)` }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20 }}>
              <ScoreCard company={otherCompany} rank={null} isOther={true} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 64, paddingTop: 28, borderTop: `1px solid ${BORDER}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "#1A3050", flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/cautio_shield.webp" alt="" style={{ width: 18, height: 18, opacity: 0.25 }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <span>© 2025 Cautio · Fleet Intelligence Platform</span>
          </div>
          <span>Live data · Refreshed on every load</span>
        </div>
      </main>
    </div>
  );
}
