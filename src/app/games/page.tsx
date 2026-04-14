"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GAMES, CATEGORIES } from "@/data/content";

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("rating");

  const filtered = GAMES
    .filter(g => (activeCategory === "all" || g.genre.toLowerCase().includes(activeCategory)) &&
      (g.title.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === "rating" ? b.rating - a.rating : a.title.localeCompare(b.title));

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {/* Header */}
        <section style={{ background: "linear-gradient(135deg,#0d0f12,#1a0a2e)", padding: "3rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", letterSpacing: "0.04em", marginBottom: "0.5rem",
              background: "linear-gradient(90deg,#e8eaf0,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              🕹️ כל המשחקים
            </h1>
            <p style={{ color: "var(--color-text-muted)" }}>גלה, דרג ושמור משחקים מועדפים</p>
          </div>
        </section>

        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
            <input
              type="text" placeholder="🔍 חיפוש משחק..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: "0.6rem 1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text)", fontSize: "var(--text-sm)", outline: "none" }}
            />
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: "0.6rem 1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text)", fontSize: "var(--text-sm)", cursor: "pointer" }}>
              <option value="rating">דירוג גבוה</option>
              <option value="alpha">א-ב</option>
            </select>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button onClick={() => setActiveCategory("all")}
              style={{ padding: "0.4rem 1rem", borderRadius: "var(--radius-full, 9999px)", border: "1px solid", cursor: "pointer", fontSize: "var(--text-sm)", fontFamily: "var(--font-display)", letterSpacing: "0.04em",
                background: activeCategory === "all" ? "var(--color-primary)" : "transparent",
                borderColor: activeCategory === "all" ? "var(--color-primary)" : "var(--color-border)",
                color: activeCategory === "all" ? "#fff" : "var(--color-text-muted)" }}>
              הכל
            </button>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                style={{ padding: "0.4rem 1rem", borderRadius: "var(--radius-full, 9999px)", border: "1px solid", cursor: "pointer", fontSize: "var(--text-sm)", fontFamily: "var(--font-display)", letterSpacing: "0.04em",
                  background: activeCategory === c.id ? "var(--color-primary)" : "transparent",
                  borderColor: activeCategory === c.id ? "var(--color-primary)" : "var(--color-border)",
                  color: activeCategory === c.id ? "#fff" : "var(--color-text-muted)" }}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>

          {/* Games grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.25rem" }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: "var(--color-text-muted)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎮</div>
                <p>לא נמצאו משחקים תואמים</p>
              </div>
            ) : filtered.map(g => (
              <div key={g.id} className="card" style={{ overflow: "hidden" }}>
                <div style={{ position: "relative" }}>
                  <img src={g.image} alt={g.title} width={400} height={225} loading="lazy"
                    style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  {g.badge && (
                    <span className={`badge badge-${g.badge==="hot"?"red":g.badge==="new"?"cyan":"gold"}`}
                      style={{ position: "absolute", top: 10, right: 10 }}>
                      {g.badge==="hot"?"🔥 HOT":g.badge==="new"?"✨ NEW":"🏆 TOP"}
                    </span>
                  )}
                  <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.75)", borderRadius: "var(--radius-sm)", padding: "0.2rem 0.6rem",
                    fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#fcd34d" }}>
                    ⭐ {g.rating}
                  </div>
                </div>
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.5rem" }}>{g.title}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="badge badge-purple">{g.genre}</span>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>👥 {g.players}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
