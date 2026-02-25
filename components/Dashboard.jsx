"use client";

import { useState, useMemo } from "react";
import { Search, RefreshCw, Building2, Car, TrendingUp, AlertCircle } from "lucide-react";
import ScoreCard from "./ScoreCard";

export default function Dashboard({ data }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");

  if (data?.error) {
    return (
      <div style={{
        minHeight: "100vh", background: "#070B14",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}>
        <div style={{
          background: "#0D1526", border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 20, padding: 48, maxWidth: 500, width: "100%", textAlign: "center",
        }}>
          <AlertCircle size={40} color="#EF4444" style={{ margin: "0 auto 16px", display: "block" }} />
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: "#F1F5F9", marginBottom: 12, margin: "0 0 12px" }}>
            Data Load Error
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7 }}>{data.error}</p>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 16 }}>
            Both Google Sheets must be shared: Share → Anyone with the link → Viewer
          </p>
        </div>
      </div>
    );
  }

  const { companies = [], totalVehicles = 0 } = data || {};
  const mainCompanies = companies.filter((c) => c.company !== "Other");
  const otherCompany  = companies.find((c) => c.company === "Other") || null;

  const overallAvg = totalVehicles > 0
    ? companies.reduce((s, c) => s + c.totalScore, 0) / totalVehicles
    : 0;

  const displayed = useMemo(() => {
    let list = [...mainCompanies];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.company.toLowerCase().includes(q) ||
        c.vehicles.some(v => v.vehicleNumber.toLowerCase().includes(q))
      );
    }
    if (sortBy === "score") list.sort((a, b) => b.avgScore - a.avgScore);
    if (sortBy === "name")  list.sort((a, b) => a.company.localeCompare(b.company));
    if (sortBy === "count") list.sort((a, b) => b.vehicleCount - a.vehicleCount);
    return list;
  }, [mainCompanies, search, sortBy]);

  return (
    <div style={{ minHeight: "100vh", background: "#070B14", fontFamily: "'DM Sans', sans-serif" }}>

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(7,11,20,0.94)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(245,158,11,0.1)",
      }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto", padding: "14px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
              overflow: "hidden", flexShrink: 0,
            }}>
              <img
                src="/cautio_shield.webp"
                alt="Cautio"
                style={{ width: 30, height: 30, objectFit: "contain" }}
                onError={e => { e.target.style.display = "none"; }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800, fontSize: 17, color: "#F1F5F9",
                letterSpacing: "-0.02em", lineHeight: 1,
              }}>CAUTIO</div>
              <div style={{ fontSize: 10, color: "#334155", marginTop: 3, letterSpacing: "0.1em" }}>
                FLEET INTELLIGENCE
              </div>
            </div>
          </div>

          {/* Center pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 22px", borderRadius: 99,
            background: "rgba(245,158,11,0.07)",
            border: "1px solid rgba(245,158,11,0.18)",
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 8px #22C55E88",
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 14, color: "#F59E0B",
            }}>Infants</span>
            <span style={{ fontSize: 13, color: "#334155" }}>Fleet Dashboard</span>
          </div>

          {/* Refresh */}
          <button
            onClick={() => window.location.reload()}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 20px", borderRadius: 10,
              background: "#0D1526", border: "1px solid #1E3A5F",
              color: "#64748B", fontSize: 13, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#F1F5F9"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "#1E3A5F"; }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "52px 32px 80px" }}>

        {/* HERO */}
        <div style={{ marginBottom: 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 16px", borderRadius: 99, marginBottom: 22,
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}>
            <span style={{
              fontSize: 11, color: "#F59E0B",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, letterSpacing: "0.1em",
            }}>SCORECARD REPORT</span>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(30px, 4vw, 50px)",
            color: "#F1F5F9", letterSpacing: "-0.04em",
            lineHeight: 1.08, margin: "0 0 14px",
          }}>
            Fleet Performance{" "}
            <span style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Overview</span>
          </h1>
          <p style={{ color: "#334155", fontSize: 15, margin: 0 }}>
            Vehicle scores grouped by sub-client · Powered by Cautio
          </p>
        </div>

        {/* STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16, marginBottom: 44,
        }}>
          {[
            { icon: Building2,  label: "Sub-Clients",    value: mainCompanies.length,            color: "#60A5FA", border: "rgba(96,165,250,0.2)"  },
            { icon: Car,        label: "Total Vehicles", value: totalVehicles,                   color: "#A78BFA", border: "rgba(167,139,250,0.2)" },
            { icon: TrendingUp, label: "Fleet Avg /100", value: overallAvg.toFixed(1),           color: "#F59E0B", border: "rgba(245,158,11,0.2)"  },
            { icon: AlertCircle,label: "Unmatched",       value: otherCompany?.vehicleCount || 0, color: "#64748B", border: "rgba(100,116,139,0.15)" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#0D1526",
              border: `1px solid ${s.border}`,
              borderRadius: 16, padding: "22px 24px",
            }}>
              <s.icon size={18} color={s.color} style={{ marginBottom: 14 }} />
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800, fontSize: 30,
                color: "#F1F5F9", lineHeight: 1, marginBottom: 6,
              }}>{s.value}</div>
              <div style={{ color: "#334155", fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* SEARCH + SORT */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={15} color="#1E3A5F" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search sub-client or vehicle number…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px 12px 44px",
                background: "#0D1526", border: "1px solid #1E3A5F",
                borderRadius: 12, color: "#F1F5F9", fontSize: 14,
                outline: "none", fontFamily: "'DM Sans', sans-serif",
                boxSizing: "border-box", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.45)"}
              onBlur={e => e.target.style.borderColor = "#1E3A5F"}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { key: "score", label: "Best Score" },
              { key: "count", label: "Most Vehicles" },
              { key: "name",  label: "A – Z" },
            ].map(opt => (
              <button key={opt.key} onClick={() => setSortBy(opt.key)} style={{
                padding: "12px 20px", borderRadius: 12, fontSize: 13,
                fontWeight: 500, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                background: sortBy === opt.key ? "rgba(245,158,11,0.1)" : "#0D1526",
                border: sortBy === opt.key ? "1px solid rgba(245,158,11,0.4)" : "1px solid #1E3A5F",
                color: sortBy === opt.key ? "#F59E0B" : "#475569",
                transition: "all 0.2s",
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {/* CARDS */}
        {displayed.length === 0 && search ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: "#1E3A5F" }}>
            <Search size={40} style={{ margin: "0 auto 14px", opacity: 0.3, display: "block" }} />
            <p style={{ fontSize: 15 }}>No results for &quot;{search}&quot;</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: 20, marginBottom: 32,
          }}>
            {displayed.map((company, idx) => (
              <ScoreCard key={company.company} company={company} rank={idx + 1} />
            ))}
          </div>
        )}

        {/* OTHER / UNMATCHED */}
        {otherCompany && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #1E3A5F)" }} />
              <span style={{
                fontSize: 11, color: "#1E3A5F", letterSpacing: "0.1em",
                fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap",
              }}>
                UNMATCHED VEHICLES ({otherCompany.vehicleCount})
              </span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1E3A5F, transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20 }}>
              <ScoreCard company={otherCompany} rank={null} isOther />
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{
          marginTop: 64, paddingTop: 28,
          borderTop: "1px solid #0D1A2E",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "#1E3A5F", flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/cautio_shield.webp" alt="" style={{ width: 18, height: 18, opacity: 0.3 }} onError={e => e.target.style.display = "none"} />
            <span>© 2024 Cautio · Fleet Intelligence Platform</span>
          </div>
          <span>Live data · Refreshed on every load</span>
        </div>
      </main>
    </div>
  );
}
