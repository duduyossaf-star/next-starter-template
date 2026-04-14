'use client'; // חובה ב-Next.js App Router כשמשתמשים ב-Hooks כמו useState

import { useState, useEffect, FormEvent } from 'react';

// תאריך היעד: 1 במאי 2026
const TARGET_DATE = new Date('2026-05-01T00:00:00').getTime();

export default function ComingSoonPage() {
  // מצב עבור המונה
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // מצב עבור הטופס
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // לוגיקת המונה לאחור
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // הזמן עבר
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // חישוב מיידי
    calculateTimeLeft();
    // עדכון כל שנייה
    const timer = setInterval(calculateTimeLeft, 1000);

    // ניקוי ה-Interval כשיוצאים מהעמוד
    return () => clearInterval(timer);
  }, []);

  // טיפול בשליחת הטופס
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Lead submitted:', email);
    // כאן תוכל להוסיף קריאת API כדי לשמור את המייל (למשל ל-Cloudflare D1 או שירות חיצוני)
    setSubmitted(true);
    setEmail(''); // איפוס השדה
  };

  // רכיב עזר להצגת מספר בתוך ריבוע במונה
  const CountdownItem = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-lg p-4 min-w-[100px] shadow-xl">
      <div className="text-5xl font-bold text-blue-400 tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white" dir="rtl">
      
      {/* רקע דקורטיבי עדין (גרדיאנט) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-60 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-12">
        
        {/* כותרת ובשורה */}
        <header className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-gradient-x">
            פורטל התוכן החדש
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            אנחנו עובדים קשה כדי להביא לכם את חווית התוכן המתקדמת ביותר. 
            יש למה לחכות.
          </p>
        </header>

        {/* המונה לאחור */}
        <section className="space-y-6">
          <h2 className="text-xl text-gray-400">ההשקה הרשמית בעוד:</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <CountdownItem value={timeLeft.days} label="ימים" />
            <CountdownItem value={timeLeft.hours} label="שעות" />
            <CountdownItem value={timeLeft.minutes} label="דקות" />
            <CountdownItem value={timeLeft.seconds} label="שניות" />
          </div>
        </section>

        {/* טופס לידים מעוצב */}
        <section className="w-full max-w-md bg-gray-950 border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <h3 className="text-2xl font-semibold text-gray-100">
            עדכנו אותי כשהאתר עולה לאוויר
          </h3>
          
          {submitted ? (
            <div className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-lg text-center font-medium">
              תודה! נעדכן אותך בקרוב.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="האימייל שלך (למשל: name@company.com)"
                required
                className="w-full px-5 py-3.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none text-right"
              />
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg transform hover:scale-[1.02]"
              >
                הרשמה לעדכונים
              </button>
            </form>
          )}
          
          <p className="text-xs text-gray-600 text-center">
            * אנחנו מכבדים את הפרטיות שלך. לא יישלח ספאם.
          </p>
        </section>

      </div>

      {/* פוטר פשוט */}
      <footer className="absolute bottom-6 z-10 text-center text-gray-700 text-sm">
        &copy; {new Date().getFullYear()} פורטל תוכן. כל הזכויות שמורות.
      </footer>
    </main>
  );
}
