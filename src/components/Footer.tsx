"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--color-border)",
      background: "var(--color-surface)",
      padding: "3rem 1.5rem 2rem",
      marginTop: "auto",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "0.08em", background: "linear-gradient(90deg,#a78bfa,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.75rem" }}>
              GAMERS
            </div>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.7 }}>
              פורטל המשחקים המוביל בישראל.<br/>חדשות, ביקורות, קהילה ותוכן.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", color: "var(--color-text)", marginBottom: "0.75rem", letterSpacing: "0.06em" }}>ניווט</h4>
            {[["ראשי","/"],["משחקים","/games"],["חדשות","/news"],["קהילה","/community"]].map(([l,h]) => (
              <Link key={h} href={h} style={{ display: "block", color: "var(--color-text-muted)", fontSize: "var(--text-sm)", textDecoration: "none", marginBottom: "0.4rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >{l}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", color: "var(--color-text)", marginBottom: "0.75rem", letterSpacing: "0.06em" }}>קטגוריות</h4>
            {["אקשן","RPG","ספורט","אסטרטגיה","אימה"].map(c => (
              <span key={c} style={{ display: "block", color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "0.4rem" }}>{c}</span>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", color: "var(--color-text)", marginBottom: "0.75rem", letterSpacing: "0.06em" }}>צור קשר</h4>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>info@gamers.co.il</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ color: "var(--color-text-faint)", fontSize: "var(--text-xs)" }}>© 2026 GAMERS. כל הזכויות שמורות.</p>
          <Link href="/admin" style={{ color: "var(--color-text-faint)", fontSize: "var(--text-xs)", textDecoration: "none" }}>פאנל ניהול</Link>
        </div>
      </div>
    </footer>
  );
}
