"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NEWS } from "@/data/content";

const CATS = ["הכל", "RPG", "חדשות", "אי-ספורט", "ביקורת", "חומרה"];

export default function NewsPage() {
  const [active, setActive] = useState("הכל");
  const filtered = active === "הכל" ? NEWS : NEWS.filter(n => n.category === active);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <section style={{ background: "linear-gradient(135deg,#0d0f12,#0a1628)", padding: "3rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", letterSpacing: "0.04em", marginBottom: "0.5rem",
              background: "linear-gradient(90deg,#e8eaf0,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              📰 חדשות גיימינג
            </h1>
            <p style={{ color: "var(--color-text-muted)" }}>עדכונים שוטפים מעולם המשחקים</p>
          </div>
        </section>

        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                style={{ padding: "0.4rem 1rem", borderRadius: "var(--radius-full, 9999px)", border: "1px solid", cursor: "pointer", fontSize: "var(--text-sm)", fontFamily: "var(--font-display)", letterSpacing: "0.04em",
                  background: active === c ? "var(--color-accent)" : "transparent",
                  borderColor: active === c ? "var(--color-accent)" : "var(--color-border)",
                  color: active === c ? "#000" : "var(--color-text-muted)" }}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured first article */}
          {filtered[0] && (
            <article className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, overflow: "hidden", marginBottom: "2rem" }}>
              <img src={filtered[0].image} alt={filtered[0].title} width={600} height={340} loading="lazy"
                style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover" }} />
              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <span className="badge badge-cyan">{filtered[0].category}</span>
                  <span className="badge badge-purple">מוצג</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, lineHeight: 1.3, marginBottom: "1rem" }}>
                  {filtered[0].title}
                </h2>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", display: "flex", gap: "1rem" }}>
                  <span>✍️ {filtered[0].author}</span>
                  <span>📅 {filtered[0].date}</span>
                  <span>⏱️ {filtered[0].readTime}</span>
                </div>
              </div>
            </article>
          )}

          {/* Rest */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
            {filtered.slice(1).map(n => (
              <article key={n.id} className="card" style={{ overflow: "hidden" }}>
                <img src={n.image} alt={n.title} width={600} height={340} loading="lazy" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span className="badge badge-cyan">{n.category}</span>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{n.readTime} קריאה</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.75rem", lineHeight: 1.4 }}>{n.title}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    <span>✍️ {n.author}</span><span>{n.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
