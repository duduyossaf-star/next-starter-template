"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const POSTS = [
  { id:1, user:"GameMaster99", avatar:"GM", time:"לפני 2 שעות", title:"מה המשחק הכי מומלץ לשחק ב-2026?", body:"אני מחפש משחק RPG חדש עם עולם פתוח גדול. מישהו ממליץ?", likes:48, comments:23, tag:"שאלה" },
  { id:2, user:"ProGamer_IL", avatar:"PG", time:"לפני 4 שעות", title:"טיפ: איך להביס את הבוס האחרון ב-Elden Ring", body:"אחרי 3 שעות של נסיונות מצאתי את הדרך - שתפו אם עזר!", likes:102, comments:41, tag:"טיפ" },
  { id:3, user:"NightOwlGamer", avatar:"NO", time:"לפני 6 שעות", title:"ביקורת: Hades II - שווה כל שקל", body:"כבר 80 שעות במשחק ועדיין לא משתעמם. הרוגלייק הטוב ביותר שיצא.", likes:76, comments:18, tag:"ביקורת" },
  { id:4, user:"TechGamer_2026", avatar:"TG", time:"אתמול", title:"המפרט שלי החדש - תגובות?", body:"RTX 5090 + Ryzen 9 9950X. מוכן לכל משחק שיצא בשנים הקרובות.", likes:134, comments:57, tag:"חומרה" },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(POSTS);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [showForm, setShowForm] = useState(false);

  function addPost() {
    if (!newTitle.trim()) return;
    setPosts([{ id: Date.now(), user: "אורח", avatar: "אר", time: "עכשיו", title: newTitle, body: newBody, likes: 0, comments: 0, tag: "כללי" }, ...posts]);
    setNewTitle(""); setNewBody(""); setShowForm(false);
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <section style={{ background: "linear-gradient(135deg,#0d0f12,#0a1a10)", padding: "3rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", letterSpacing: "0.04em", marginBottom: "0.5rem",
              background: "linear-gradient(90deg,#e8eaf0,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              👾 קהילת GAMERS
            </h1>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>שתף, דון ותגלה עם הגיימרים הטובים ביותר</p>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ פוסט חדש</button>
          </div>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
          {showForm && (
            <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "1rem" }}>פוסט חדש</h3>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
                placeholder="כותרת הפוסט..." style={{ width: "100%", padding: "0.7rem 1rem", background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text)", fontSize: "var(--text-sm)", marginBottom: "0.75rem", outline: "none" }} />
              <textarea value={newBody} onChange={e => setNewBody(e.target.value)}
                placeholder="תוכן הפוסט..." rows={4} style={{ width: "100%", padding: "0.7rem 1rem", background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text)", fontSize: "var(--text-sm)", resize: "vertical", outline: "none", marginBottom: "1rem" }} />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="btn-primary" onClick={addPost}>פרסם</button>
                <button className="btn-secondary" onClick={() => setShowForm(false)}>ביטול</button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {posts.map(p => (
              <article key={p.id} className="card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,var(--color-primary),var(--color-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xs)", color: "#fff", flexShrink: 0 }}>
                      {p.avatar}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-sm)" }}>{p.user}</div>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{p.time}</div>
                    </div>
                  </div>
                  <span className="badge badge-green">{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 600, marginBottom: "0.5rem" }}>{p.title}</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "1rem" }}>{p.body}</p>
                <div style={{ display: "flex", gap: "1rem", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  <button onClick={() => setPosts(posts.map(x => x.id===p.id ? {...x, likes: x.likes+1} : x))}
                    style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "var(--text-xs)" }}>
                    ❤️ {p.likes}
                  </button>
                  <span>💬 {p.comments} תגובות</span>
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
