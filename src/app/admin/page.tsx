"use client";
import { useState } from "react";
import Link from "next/link";
import { GAMES as INIT_GAMES, NEWS as INIT_NEWS, ADMIN_PASSWORD } from "@/data/content";

type Game = typeof INIT_GAMES[0];
type NewsItem = typeof INIT_NEWS[0];
type Tab = "dashboard" | "games" | "news";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [games, setGames] = useState<Game[]>(INIT_GAMES);
  const [news, setNews] = useState<NewsItem[]>(INIT_NEWS);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newGame, setNewGame] = useState(false);
  const [newNews, setNewNews] = useState(false);
  const [toast, setToast] = useState("");

  function login() {
    if (pw === ADMIN_PASSWORD) { setAuth(true); setPwError(false); }
    else { setPwError(true); setPw(""); }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function saveGame(g: Game) {
    if (g.id === 0) {
      setGames([...games, { ...g, id: Date.now() }]);
      showToast("✅ משחק נוסף בהצלחה!");
    } else {
      setGames(games.map(x => x.id === g.id ? g : x));
      showToast("✅ משחק עודכן בהצלחה!");
    }
    setEditingGame(null); setNewGame(false);
  }

  function deleteGame(id: number) {
    if (confirm("למחוק את המשחק?")) {
      setGames(games.filter(g => g.id !== id));
      showToast("🗑️ משחק נמחק");
    }
  }

  function saveNews(n: NewsItem) {
    if (n.id === 0) {
      setNews([{ ...n, id: Date.now() }, ...news]);
      showToast("✅ כתבה נוספה בהצלחה!");
    } else {
      setNews(news.map(x => x.id === n.id ? n : x));
      showToast("✅ כתבה עודכנה בהצלחה!");
    }
    setEditingNews(null); setNewNews(false);
  }

  function deleteNews(id: number) {
    if (confirm("למחוק את הכתבה?")) {
      setNews(news.filter(n => n.id !== id));
      showToast("🗑️ כתבה נמחקה");
    }
  }

  // LOGIN SCREEN
  if (!auth) return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)", padding: "2.5rem", textAlign: "center" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none" style={{ margin: "0 auto 1rem" }} aria-label="GAMERS">
            <rect width="36" height="36" rx="8" fill="url(#gAdmin)"/>
            <path d="M8 18h5v5H8v-5zm0-7h5v5H8v-5zm7 0h5v12h-5V11zm7 4h6v4h-6v-4zm0 5h6v3h-6v-3z" fill="white"/>
            <defs><linearGradient id="gAdmin" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
          </svg>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>פאנל ניהול</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>הכנס סיסמה לכניסה</p>
        </div>
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="••••••••••"
            style={{ width: "100%", padding: "0.8rem 1rem", background: "var(--color-surface-2)", border: `1px solid ${pwError ? "var(--color-red)" : "var(--color-border)"}`, borderRadius: "var(--radius-md)", color: "var(--color-text)", fontSize: "var(--text-base)", textAlign: "center", letterSpacing: "0.2em", outline: "none" }} />
        </div>
        {pwError && <p style={{ color: "var(--color-red)", fontSize: "var(--text-sm)", marginBottom: "1rem" }}>❌ סיסמה שגויה, נסה שוב</p>}
        <button className="btn-primary" onClick={login} style={{ width: "100%", justifyContent: "center", padding: "0.8rem" }}>🔐 כניסה</button>
        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", textDecoration: "none" }}>← חזרה לאתר</Link>
        </div>
      </div>
    </div>
  );

  const SIDEBAR = [
    { id:"dashboard" as Tab, icon:"📊", label:"לוח בקרה" },
    { id:"games" as Tab,     icon:"🕹️", label:"משחקים" },
    { id:"news" as Tab,      icon:"📰", label:"חדשות" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 999,
          background: "var(--color-surface-3)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)",
          padding: "0.75rem 1.5rem", fontSize: "var(--text-sm)", fontFamily: "var(--font-display)", letterSpacing: "0.04em",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: 220, background: "var(--color-surface)", borderLeft: "1px solid var(--color-border)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.08em",
          background: "linear-gradient(90deg,#a78bfa,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1.5rem", paddingRight: "0.5rem" }}>
          GAMERS ADMIN
        </div>
        {SIDEBAR.map(s => (
          <button key={s.id} onClick={() => setTab(s.id)}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", letterSpacing: "0.04em", textAlign: "right",
              background: tab === s.id ? "rgba(124,58,237,0.2)" : "transparent",
              color: tab === s.id ? "#a78bfa" : "var(--color-text-muted)" }}>
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--color-border)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", borderRadius: "var(--radius-md)", color: "var(--color-text-muted)", fontSize: "var(--text-sm)", textDecoration: "none", fontFamily: "var(--font-display)" }}>
            🏠 חזרה לאתר
          </Link>
          <button onClick={() => setAuth(false)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", padding: "0.7rem 1rem", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", color: "var(--color-red)", fontSize: "var(--text-sm)", fontFamily: "var(--font-display)", background: "transparent" }}>
            🚪 יציאה
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", marginBottom: "2rem", letterSpacing: "0.04em" }}>לוח בקרה</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                { label:"משחקים", value: games.length, icon:"🕹️", color:"#a78bfa" },
                { label:"כתבות",  value: news.length,  icon:"📰", color:"#67e8f9" },
                { label:"גיימרים",value:"50K+",         icon:"👥", color:"#6ee7b7" },
                { label:"פוסטים", value:"1,204",         icon:"💬", color:"#fcd34d" },
              ].map(s => (
                <div key={s.label} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", letterSpacing: "0.04em" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", marginBottom: "1rem", letterSpacing: "0.04em" }}>פעולות מהירות</h2>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => { setTab("games"); setNewGame(true); }}>+ הוסף משחק</button>
                <button className="btn-secondary" onClick={() => { setTab("news"); setNewNews(true); }}>+ הוסף כתבה</button>
              </div>
            </div>
          </div>
        )}

        {/* GAMES TAB */}
        {tab === "games" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", letterSpacing: "0.04em" }}>ניהול משחקים ({games.length})</h1>
              <button className="btn-primary" onClick={() => { setNewGame(true); setEditingGame(null); }}>+ הוסף משחק</button>
            </div>

            {(newGame || editingGame) && (
              <GameForm
                game={editingGame || { id:0, title:"", genre:"", rating:8.0, image:"", badge:null, players:"" }}
                onSave={saveGame}
                onCancel={() => { setEditingGame(null); setNewGame(false); }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {games.map(g => (
                <div key={g.id} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1rem", flexWrap: "wrap" }}>
                  <img src={g.image} alt={g.title} width={80} height={45} loading="lazy" style={{ borderRadius: "var(--radius-sm)", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{g.title}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{g.genre} · ⭐{g.rating} · 👥{g.players}</div>
                  </div>
                  {g.badge && <span className={`badge badge-${g.badge==="hot"?"red":g.badge==="new"?"cyan":"gold"}`}>{g.badge.toUpperCase()}</span>}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => { setEditingGame(g); setNewGame(false); }}
                      style={{ padding: "0.4rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-muted)", fontSize: "var(--text-xs)", cursor: "pointer" }}>✏️ עריכה</button>
                    <button onClick={() => deleteGame(g.id)}
                      style={{ padding: "0.4rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "var(--color-red)", fontSize: "var(--text-xs)", cursor: "pointer" }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {tab === "news" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", letterSpacing: "0.04em" }}>ניהול חדשות ({news.length})</h1>
              <button className="btn-primary" onClick={() => { setNewNews(true); setEditingNews(null); }}>+ הוסף כתבה</button>
            </div>

            {(newNews || editingNews) && (
              <NewsForm
                item={editingNews || { id:0, title:"", category:"חדשות", date:"", image:"https://picsum.photos/seed/new/600/340", author:"", readTime:"3 דק'" }}
                onSave={saveNews}
                onCancel={() => { setEditingNews(null); setNewNews(false); }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {news.map(n => (
                <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1rem", flexWrap: "wrap" }}>
                  <img src={n.image} alt={n.title} width={80} height={45} loading="lazy" style={{ borderRadius: "var(--radius-sm)", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-sm)" }}>{n.title}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{n.category} · ✍️{n.author} · {n.date}</div>
                  </div>
                  <span className="badge badge-cyan">{n.category}</span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => { setEditingNews(n); setNewNews(false); }}
                      style={{ padding: "0.4rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-muted)", fontSize: "var(--text-xs)", cursor: "pointer" }}>✏️ עריכה</button>
                    <button onClick={() => deleteNews(n.id)}
                      style={{ padding: "0.4rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "var(--color-red)", fontSize: "var(--text-xs)", cursor: "pointer" }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ---- Sub-components ----

function GameForm({ game, onSave, onCancel }: { game: Game; onSave:(g:Game)=>void; onCancel:()=>void }) {
  const [form, setForm] = useState(game);
  const f = (k: keyof Game, v: string | number | null) => setForm({ ...form, [k]: v });
  return (
    <div style={{ background: "var(--color-surface-2)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "var(--radius-xl)", padding: "1.5rem", marginBottom: "1.5rem" }}>
      <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "1.25rem", color: "#a78bfa" }}>{game.id===0?"הוספת משחק חדש":"עריכת משחק"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          שם המשחק
          <input value={form.title} onChange={e=>f("title",e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          ז'אנר
          <input value={form.genre} onChange={e=>f("genre",e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          דירוג (0-10)
          <input type="number" min={0} max={10} step={0.1} value={form.rating} onChange={e=>f("rating",parseFloat(e.target.value))} style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          שחקנים
          <input value={form.players} onChange={e=>f("players",e.target.value)} placeholder="לדוג׳ 5.5M" style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)",gridColumn:"1/-1" }}>
          URL תמונה
          <input value={form.image} onChange={e=>f("image",e.target.value)} placeholder="https://picsum.photos/seed/name/400/225" style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          תג
          <select value={form.badge||""} onChange={e=>f("badge",e.target.value||null)} style={inputStyle}>
            <option value="">ללא</option>
            <option value="hot">🔥 HOT</option>
            <option value="new">✨ NEW</option>
            <option value="top">🏆 TOP</option>
          </select>
        </label>
      </div>
      <div style={{ display:"flex",gap:"0.75rem" }}>
        <button className="btn-primary" onClick={()=>onSave(form)}>💾 שמור</button>
        <button className="btn-secondary" onClick={onCancel}>ביטול</button>
      </div>
    </div>
  );
}

function NewsForm({ item, onSave, onCancel }: { item: NewsItem; onSave:(n:NewsItem)=>void; onCancel:()=>void }) {
  const [form, setForm] = useState(item);
  const f = (k: keyof NewsItem, v: string) => setForm({ ...form, [k]: v });
  return (
    <div style={{ background: "var(--color-surface-2)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "var(--radius-xl)", padding: "1.5rem", marginBottom: "1.5rem" }}>
      <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "1.25rem", color: "#67e8f9" }}>{item.id===0?"הוספת כתבה חדשה":"עריכת כתבה"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)",gridColumn:"1/-1" }}>
          כותרת
          <input value={form.title} onChange={e=>f("title",e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          קטגוריה
          <select value={form.category} onChange={e=>f("category",e.target.value)} style={inputStyle}>
            {["RPG","חדשות","אי-ספורט","ביקורת","חומרה","כללי"].map(c=><option key={c}>{c}</option>)}
          </select>
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          כותב
          <input value={form.author} onChange={e=>f("author",e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          תאריך
          <input value={form.date} onChange={e=>f("date",e.target.value)} placeholder="14 אפריל 2026" style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)" }}>
          זמן קריאה
          <input value={form.readTime} onChange={e=>f("readTime",e.target.value)} placeholder="5 דק'" style={inputStyle} />
        </label>
        <label style={{ display:"flex",flexDirection:"column",gap:"0.4rem",fontSize:"var(--text-sm)",color:"var(--color-text-muted)",gridColumn:"1/-1" }}>
          URL תמונה
          <input value={form.image} onChange={e=>f("image",e.target.value)} style={inputStyle} />
        </label>
      </div>
      <div style={{ display:"flex",gap:"0.75rem" }}>
        <button className="btn-primary" onClick={()=>onSave(form)}>💾 שמור</button>
        <button className="btn-secondary" onClick={onCancel}>ביטול</button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.6rem 0.9rem",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text)",
  fontSize: "var(--text-sm)",
  outline: "none",
  width: "100%",
};
