import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GAMES, NEWS, CATEGORIES } from "@/data/content";

export default function HomePage() {
  const featured = GAMES.slice(0, 4);
  const topNews = NEWS.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{
          position: "relative", overflow: "hidden",
          padding: "5rem 1.5rem 4rem",
          background: "linear-gradient(135deg, #0d0f12 0%, #1a0a2e 50%, #0a1628 100%)",
          textAlign: "center",
        }}>
          {/* bg glow */}
          <div style={{ position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 70%)",pointerEvents:"none" }}/>
          <div className="animate-fadeup" style={{ position:"relative", maxWidth:800, margin:"0 auto" }}>
            <span className="badge badge-purple" style={{ marginBottom:"1.5rem", display:"inline-flex" }}>🎮 פורטל הגיימינג #1 בישראל</span>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-3xl)", fontWeight:700, letterSpacing:"0.04em", marginBottom:"1.5rem",
              background:"linear-gradient(135deg,#e8eaf0 0%,#a78bfa 50%,#67e8f9 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.1 }}>
              ברוכים הבאים ל-GAMERS
            </h1>
            <p style={{ fontSize:"var(--text-lg)", color:"var(--color-text-muted)", maxWidth:540, margin:"0 auto 2.5rem", lineHeight:1.7 }}>
              חדשות, ביקורות, טיפים ותוכן גיימינג מהמובחרים ביותר. הקהילה הגדולה של גיימרים ישראלים.
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/games" className="btn-primary">🕹️ כל המשחקים</Link>
              <Link href="/news" className="btn-secondary">📰 חדשות אחרונות</Link>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display:"flex", gap:"2rem", justifyContent:"center", flexWrap:"wrap", marginTop:"4rem", position:"relative" }}>
            {[["50K+","גיימרים רשומים"],["1,200+","משחקים במאגר"],["500+","מאמרים וביקורות"],["24/7","עדכונים שוטפים"]].map(([n,l]) => (
              <div key={n} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-xl)", fontWeight:700, color:"#a78bfa" }}>{n}</div>
                <div style={{ fontSize:"var(--text-xs)", color:"var(--color-text-muted)", letterSpacing:"0.04em" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section style={{ padding:"3rem 1.5rem", maxWidth:1200, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-xl)", marginBottom:"1.5rem", letterSpacing:"0.04em" }}>קטגוריות משחקים</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"1rem" }}>
            {CATEGORIES.map(c => (
              <Link key={c.id} href={`/games?cat=${c.id}`} style={{ textDecoration:"none" }}>
                <div className="card" style={{ padding:"1.25rem", textAlign:"center", cursor:"pointer" }}>
                  <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>{c.icon}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"var(--text-sm)", letterSpacing:"0.04em" }}>{c.name}</div>
                  <div style={{ fontSize:"var(--text-xs)", color:"var(--color-text-muted)", marginTop:"0.25rem" }}>{c.count} משחקים</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED GAMES */}
        <section style={{ padding:"1rem 1.5rem 3rem", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-xl)", letterSpacing:"0.04em" }}>משחקים מובחרים</h2>
            <Link href="/games" style={{ color:"#a78bfa", fontSize:"var(--text-sm)", textDecoration:"none", fontFamily:"var(--font-display)", letterSpacing:"0.04em" }}>הכל ←</Link>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1.25rem" }}>
            {featured.map(g => (
              <div key={g.id} className="card" style={{ overflow:"hidden" }}>
                <div style={{ position:"relative" }}>
                  <img src={g.image} alt={g.title} width={400} height={225} loading="lazy" style={{ width:"100%", height:180, objectFit:"cover" }} />
                  {g.badge && (
                    <span className={`badge badge-${g.badge==="hot"?"red":g.badge==="new"?"cyan":"gold"}`}
                      style={{ position:"absolute", top:10, right:10 }}>
                      {g.badge==="hot"?"🔥 HOT":g.badge==="new"?"✨ NEW":"🏆 TOP"}
                    </span>
                  )}
                </div>
                <div style={{ padding:"1rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.5rem" }}>
                    <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-base)", fontWeight:600 }}>{g.title}</h3>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-lg)", fontWeight:700, color:"#fcd34d" }}>{g.rating}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span className="badge badge-purple">{g.genre}</span>
                    <span style={{ fontSize:"var(--text-xs)", color:"var(--color-text-muted)" }}>👥 {g.players}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST NEWS */}
        <section style={{ padding:"1rem 1.5rem 3rem", background:"var(--color-surface)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-xl)", letterSpacing:"0.04em" }}>חדשות אחרונות</h2>
              <Link href="/news" style={{ color:"#a78bfa", fontSize:"var(--text-sm)", textDecoration:"none", fontFamily:"var(--font-display)", letterSpacing:"0.04em" }}>הכל ←</Link>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:"1.25rem" }}>
              {topNews.map(n => (
                <article key={n.id} className="card" style={{ overflow:"hidden" }}>
                  <img src={n.image} alt={n.title} width={600} height={340} loading="lazy" style={{ width:"100%", height:200, objectFit:"cover" }} />
                  <div style={{ padding:"1.25rem" }}>
                    <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.75rem" }}>
                      <span className="badge badge-cyan">{n.category}</span>
                      <span style={{ fontSize:"var(--text-xs)", color:"var(--color-text-muted)" }}>{n.readTime} קריאה</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-base)", fontWeight:600, marginBottom:"0.75rem", lineHeight:1.4 }}>{n.title}</h3>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:"var(--text-xs)", color:"var(--color-text-muted)" }}>
                      <span>✍️ {n.author}</span>
                      <span>{n.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:"4rem 1.5rem", textAlign:"center", background:"linear-gradient(135deg,#1a0a2e,#0a1628)" }}>
          <div style={{ maxWidth:600, margin:"0 auto" }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-2xl)", letterSpacing:"0.04em", marginBottom:"1rem",
              background:"linear-gradient(90deg,#a78bfa,#67e8f9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              הצטרף לקהילה
            </h2>
            <p style={{ color:"var(--color-text-muted)", fontSize:"var(--text-base)", marginBottom:"2rem" }}>
              מעל 50,000 גיימרים כבר כאן. הצטרף לדיונים, שתף ביקורות ותגלה משחקים חדשים.
            </p>
            <Link href="/community" className="btn-primary" style={{ fontSize:"var(--text-base)", padding:"0.8rem 2.5rem" }}>
              🚀 הצטרף עכשיו
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
