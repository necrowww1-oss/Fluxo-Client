import { useEvents, purchase } from "./fluxo-firebase.js";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   FLUXO — estilo DICE.fm
   Dark · Full-bleed art · Tipografía grande · Mobile-first
═══════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:          #0e0e0e;
  --surface:     #1a1a1a;
  --surface2:    #242424;
  --border:      rgba(255,255,255,.1);
  --border2:     rgba(255,255,255,.06);
  --white:       #ffffff;
  --off:         rgba(255,255,255,.55);
  --dim:         rgba(255,255,255,.3);
  --accent:      #ffffff;
  --pill-bg:     rgba(255,255,255,.1);
  --pill-hover:  rgba(255,255,255,.16);
  --ff: 'Figtree', system-ui, sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

html { background: var(--bg); scroll-behavior: smooth; }
body {
  font-family: var(--ff);
  background: var(--bg);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
}

::-webkit-scrollbar { width: 0; }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 430px;
  z-index: 90;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 18px; height: 56px;
  transition: background .3s, backdrop-filter .3s;
}
.nav.solid {
  background: rgba(14,14,14,.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border2);
}
.nav-logo {
  font-size: 19px; font-weight: 800; color: var(--white);
  letter-spacing: -.4px;
}
.nav-actions { display: flex; align-items: center; gap: 10px; }
.nav-icon-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--pill-bg); border: none; cursor: pointer;
  color: var(--white); font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s;
}
.nav-icon-btn:hover { background: var(--pill-hover); }

/* ── HERO ── */
.hero {
  position: relative;
  height: 100dvh; max-height: 680px; min-height: 500px;
  overflow: hidden;
}
.hero-art {
  position: absolute; inset: 0;
  transition: opacity .6s ease;
}
.hero-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(
    180deg,
    rgba(14,14,14,0) 0%,
    rgba(14,14,14,.1) 40%,
    rgba(14,14,14,.7) 70%,
    rgba(14,14,14,1) 100%
  );
  z-index: 2;
}
.hero-gradient-top {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(14,14,14,.5) 0%, transparent 30%);
  z-index: 2;
}
.hero-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 0 20px 28px; z-index: 3;
}
.hero-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--pill-bg); backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  padding: 5px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  text-transform: uppercase; color: var(--white);
  margin-bottom: 12px;
}
.hero-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--white); animation: hpulse 2s infinite;
}
@keyframes hpulse { 0%,100%{opacity:1} 50%{opacity:.3} }
.hero-artist {
  font-size: clamp(36px, 9vw, 52px);
  font-weight: 900; line-height: .96;
  letter-spacing: -.5px; margin-bottom: 10px;
  text-shadow: 0 2px 20px rgba(0,0,0,.4);
}
.hero-meta {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--off); flex-wrap: wrap;
}
.hero-meta-sep { color: var(--dim); }

/* ── STICKY BUY BAR ── */
.buy-bar {
  position: sticky; bottom: 0;
  background: rgba(14,14,14,.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border2);
  padding: 14px 18px;
  display: flex; align-items: center; gap: 12px;
  z-index: 80;
}
.buy-bar-price { flex: 1; }
.buy-bar-from { font-size: 11px; color: var(--dim); margin-bottom: 2px; }
.buy-bar-val  { font-size: 20px; font-weight: 800; letter-spacing: -.4px; }
.buy-bar-btn {
  flex: 2; padding: 14px 20px; border-radius: 14px;
  border: none; cursor: pointer; font-family: var(--ff);
  font-size: 15px; font-weight: 700; letter-spacing: -.1px;
  background: var(--white); color: var(--bg);
  transition: transform .15s, opacity .15s;
}
.buy-bar-btn:hover { transform: scale(1.02); }
.buy-bar-btn:active { transform: scale(.98); }

/* ── SECTIONS ── */
.page-content { padding: 4px 0 120px; }
.section {
  padding: 24px 20px;
  border-bottom: 1px solid var(--border2);
}
.section:last-child { border-bottom: none; }
.section-label {
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--dim); margin-bottom: 14px;
}

/* ── INFO TILES ── */
.info-tiles { display: flex; flex-direction: column; gap: 1px; }
.info-tile {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border2);
}
.info-tile:last-child { border-bottom: none; }
.info-tile-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: var(--surface2); display: flex; align-items: center;
  justify-content: center; font-size: 18px; flex-shrink: 0;
}
.info-tile-body { flex: 1; min-width: 0; }
.info-tile-label { font-size: 11px; color: var(--dim); margin-bottom: 3px; font-weight: 500; }
.info-tile-val   { font-size: 15px; font-weight: 600; }
.info-tile-sub   { font-size: 12px; color: var(--off); margin-top: 1px; }
.info-tile-right { font-size: 18px; color: var(--dim); }

/* ── LINEUP ── */
.lineup-list { display: flex; flex-direction: column; gap: 1px; }
.lineup-item {
  display: flex; align-items: center; gap: 14px; padding: 12px 0;
  border-bottom: 1px solid var(--border2);
}
.lineup-item:last-child { border-bottom: none; }
.lineup-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  overflow: hidden; flex-shrink: 0;
}
.lineup-avatar-art {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
}
.lineup-info { flex: 1; }
.lineup-name { font-size: 15px; font-weight: 700; margin-bottom: 3px; }
.lineup-role { font-size: 12px; color: var(--off); }
.lineup-arrow { font-size: 16px; color: var(--dim); }

/* ── TICKET TYPES ── */
.tt-list { display: flex; flex-direction: column; gap: 10px; }
.tt-card {
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: 16px; padding: 18px;
  display: flex; align-items: center; gap: 14px;
  cursor: pointer; transition: all .2s;
  position: relative; overflow: hidden;
}
.tt-card::before {
  content: ''; position: absolute; inset: 0; border-radius: 16px;
  background: rgba(255,255,255,0); transition: background .2s;
}
.tt-card:hover::before { background: rgba(255,255,255,.04); }
.tt-card.selected {
  border-color: var(--white); background: var(--surface2);
}
.tt-card-info { flex: 1; }
.tt-card-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
.tt-card-desc { font-size: 12px; color: var(--off); line-height: 1.4; }
.tt-card-avail { font-size: 11px; color: var(--dim); margin-top: 5px; font-weight: 500; }
.tt-card-avail.few { color: #fb923c; }
.tt-card-right { text-align: right; flex-shrink: 0; }
.tt-card-price { font-size: 17px; font-weight: 800; margin-bottom: 8px; }
.tt-qty { display: flex; align-items: center; gap: 10px; justify-content: flex-end; }
.tt-qbtn {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1.5px solid var(--border); background: transparent;
  color: var(--white); font-size: 17px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .15s; line-height: 1;
}
.tt-qbtn:hover { border-color: var(--white); background: var(--pill-hover); }
.tt-qbtn:disabled { opacity: .2; cursor: not-allowed; }
.tt-qval { font-size: 15px; font-weight: 700; min-width: 20px; text-align: center; }

/* ── MAP ── */
.map-box {
  border-radius: 16px; overflow: hidden;
  background: var(--surface); height: 160px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px;
  border: 1px solid var(--border2);
}
.map-btn {
  width: 100%; padding: 13px; border-radius: 12px;
  border: 1px solid var(--border); background: transparent;
  color: var(--white); font-family: var(--ff); font-size: 13px;
  font-weight: 600; cursor: pointer; transition: background .15s;
}
.map-btn:hover { background: var(--pill-hover); }

/* ── BOTTOM SHEET ── */
.overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex; align-items: flex-end;
}
.sheet {
  background: #141414; width: 100%; max-width: 430px;
  margin: 0 auto;
  border-radius: 24px 24px 0 0;
  max-height: 92dvh; overflow-y: auto;
  animation: sheetUp .34s var(--ease);
  border-top: 1px solid var(--border2);
}
@keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.sheet-handle {
  width: 36px; height: 4px; border-radius: 2px;
  background: var(--border); margin: 14px auto 0;
}
.sheet-inner { padding: 20px 20px 40px; }
.sheet-title {
  font-size: 22px; font-weight: 800; letter-spacing: -.4px; margin-bottom: 4px;
}
.sheet-sub { font-size: 13px; color: var(--off); margin-bottom: 24px; }

.step-dots { display: flex; gap: 6px; margin-bottom: 26px; }
.step-dot { height: 3px; border-radius: 2px; transition: all .3s; }
.step-dot.on  { background: var(--white); flex: 2; }
.step-dot.off { background: var(--border); flex: 1; }

/* ── FORM ── */
.form-g { margin-bottom: 14px; }
.form-lbl {
  display: block; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px; color: var(--dim);
  margin-bottom: 8px;
}
.form-inp {
  width: 100%; padding: 14px 16px;
  background: var(--surface2); border: 1px solid var(--border2);
  border-radius: 12px; color: var(--white); font-family: var(--ff);
  font-size: 15px; font-weight: 500; outline: none;
  transition: border-color .15s;
}
.form-inp:focus { border-color: rgba(255,255,255,.4); }
.form-inp::placeholder { color: rgba(255,255,255,.2); }
.form-hint { font-size: 11px; color: var(--dim); margin-top: 6px; }

/* ── SUMMARY ── */
.summary {
  background: var(--surface2); border-radius: 14px; padding: 16px; margin: 16px 0;
}
.sum-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
.sum-lbl { color: var(--off); }
.sum-val { font-weight: 600; }
.sum-divider { height: 1px; background: var(--border2); margin: 10px 0; }
.sum-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; }
.sum-total-val { font-size: 20px; }
.split-note {
  margin-top: 10px; padding: 10px 12px; border-radius: 10px;
  background: rgba(255,255,255,.05); border: 1px solid var(--border2);
  font-size: 11px; color: var(--dim); line-height: 1.6;
}

/* ── SHEET BUTTONS ── */
.sheet-btn {
  width: 100%; padding: 16px; border-radius: 14px; border: none;
  font-family: var(--ff); font-size: 16px; font-weight: 800;
  background: var(--white); color: var(--bg);
  cursor: pointer; transition: all .15s; letter-spacing: -.2px;
  margin-top: 12px;
}
.sheet-btn:hover { opacity: .9; transform: scale(1.01); }
.sheet-btn:disabled { opacity: .3; cursor: not-allowed; transform: none; }
.sheet-btn.ghost {
  background: transparent; color: var(--off);
  border: 1px solid var(--border2); font-size: 14px; font-weight: 600;
}
.sheet-btn.ghost:hover { background: var(--pill-hover); color: var(--white); opacity: 1; transform: none; }

/* ── TICKET VISUAL ── */
.ticket {
  border-radius: 18px; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,.5);
  margin: 0 auto; max-width: 340px;
}
.ticket-art {
  height: 160px; display: flex; align-items: flex-end;
  padding: 16px 20px; position: relative; overflow: hidden;
}
.ticket-art-bg { position: absolute; inset: 0; }
.ticket-art-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,.7) 100%);
}
.ticket-art-name {
  position: relative; z-index: 1;
  font-size: 22px; font-weight: 900; letter-spacing: -.3px;
  line-height: 1.05; text-shadow: 0 2px 12px rgba(0,0,0,.5);
}
.ticket-perf {
  height: 1px;
  background: repeating-linear-gradient(
    90deg, #111 0, #111 7px, #1f1f1f 7px, #1f1f1f 13px
  );
  background-color: #1a1a1a;
  position: relative;
}
.ticket-perf::before, .ticket-perf::after {
  content: ''; position: absolute;
  width: 22px; height: 22px; border-radius: 50%;
  background: #141414; top: -11px;
}
.ticket-perf::before { left: -11px; }
.ticket-perf::after  { right: -11px; }
.ticket-body { background: #1a1a1a; padding: 18px 20px 22px; }
.ticket-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.ticket-field label {
  display: block; font-size: 8px; text-transform: uppercase;
  letter-spacing: 1.5px; color: rgba(255,255,255,.3); margin-bottom: 3px;
}
.ticket-field span { font-size: 12px; font-weight: 700; }
.ticket-qr-row {
  display: flex; gap: 14px; align-items: center;
  background: rgba(255,255,255,.04); border-radius: 12px; padding: 14px;
}
.ticket-qr-box {
  width: 80px; height: 80px; border-radius: 8px;
  background: var(--white); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 30px;
}
.ticket-qr-info { flex: 1; min-width: 0; }
.ticket-qr-label {
  font-size: 10px; color: var(--dim); margin-bottom: 4px;
  font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
}
.ticket-hash { font-size: 8px; color: var(--dim); word-break: break-all; line-height: 1.5; }
.ticket-foot {
  background: #141414; padding: 12px 20px;
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid rgba(255,255,255,.06);
}
.ticket-status { font-size: 11px; font-weight: 700; color: #4ade80; letter-spacing: .5px; }
.ticket-amount { font-size: 15px; font-weight: 800; }

/* ── SUCCESS ── */
.success-header { text-align: center; padding: 20px 0 24px; }
.success-ico {
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(74,222,128,.12); border: 1px solid rgba(74,222,128,.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; margin: 0 auto 16px;
}
.success-title { font-size: 24px; font-weight: 900; margin-bottom: 6px; letter-spacing: -.3px; }
.success-sub { font-size: 13px; color: var(--off); line-height: 1.6; }
`;

/* ── DATA ── */
const EVENTS = [
  {
    id: "e1",
    artist: "Marilina Bertoldi & Alok",
    tag: "Electrónica · Rock",
    venue: "Club Niceto",
    city: "Palermo, CABA",
    day: "28", month: "MAR", year: "2025",
    time: "23:00", doors: "22:00",
    emoji: "🎧",
    color1: "#1a0533", color2: "#6b21a8", color3: "#c084fc",
    lineup: [
      { name: "Marilina Bertoldi", role: "Headliner",  emoji: "🎤" },
      { name: "Alok",              role: "DJ Set",      emoji: "🎛️" },
      { name: "VTSS",              role: "Telonero",    emoji: "💿" },
    ],
    types: [
      { id: "t1", name: "General", price: 9500,  desc: "Acceso piso principal",                        avail: 63 },
      { id: "t2", name: "VIP",     price: 24000, desc: "Sector preferencial + 1 trago incluido",       avail: 8  },
    ],
  },
  {
    id: "e2",
    artist: "Cuarteto del Norte",
    tag: "Folklore · Cuarteto",
    venue: "Ópera Córdoba",
    city: "Nueva Córdoba, CBA",
    day: "04", month: "ABR", year: "2025",
    time: "21:00", doors: "20:00",
    emoji: "🎶",
    color1: "#1c0a00", color2: "#9a3412", color3: "#fb923c",
    lineup: [
      { name: "Cuarteto del Norte", role: "Artista principal", emoji: "🎶" },
      { name: "Los Palmeras Jr.",   role: "Invitados",          emoji: "🌴" },
    ],
    types: [
      { id: "t3", name: "Campo",    price: 8000,  desc: "Acceso campo frente al escenario",      avail: 200 },
      { id: "t4", name: "Platea A", price: 18000, desc: "Butacas premium con vista directa",      avail: 22  },
    ],
  },
  {
    id: "e3",
    artist: "La Gaviota",
    tag: "Teatro · Drama",
    venue: "Teatro Picadero",
    city: "Palermo, CABA",
    day: "29", month: "MAR", year: "2025",
    time: "20:30", doors: "20:00",
    emoji: "🎭",
    color1: "#0a0f1a", color2: "#1e3a5f", color3: "#60a5fa",
    lineup: [
      { name: "Elenco estable",   role: "Actuación", emoji: "🎭" },
      { name: "Dir. Cecilia Vars", role: "Dirección", emoji: "🎬" },
    ],
    types: [
      { id: "t5", name: "Platea",  price: 14000, desc: "Butacas centrales fila 1–10", avail: 40 },
      { id: "t6", name: "Paraíso", price: 7500,  desc: "Sector superior",             avail: 80 },
    ],
  },
];

const fmt = n =>
  new Intl.NumberFormat("es-AR", {
    style: "currency", currency: "ARS", maximumFractionDigits: 0,
  }).format(n);

const FEE = 0.08;

/* ── ART ── */
function EventArt({ ev, style = {} }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `radial-gradient(ellipse 80% 80% at 60% 30%, ${ev.color3}55 0%, ${ev.color2} 45%, ${ev.color1} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 80, ...style,
    }}>
      {ev.emoji}
    </div>
  );
}

/* ── CHECKOUT SHEET ── */
function CheckoutSheet({ event: ev, onClose }) {
  const [step, setStep]     = useState(1);
  const [qty, setQty]       = useState({});
  const [buyer, setBuyer]   = useState({ name: "", email: "", dni: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);
  const [hash]              = useState(
    `hmac_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 8)}`
  );

  const totalQty = Object.values(qty).reduce((a, b) => a + b, 0);
  const subtotal = ev.types.reduce((s, t) => s + (qty[t.id] || 0) * t.price, 0);
  const fee      = Math.round(subtotal * FEE);
  const total    = subtotal + fee;

  const canNext2 = totalQty > 0;
  const canNext3 = buyer.name.trim() && buyer.email.includes("@") && buyer.dni.trim();

  function setQ(id, delta) {
    setQty(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  }

  function pay() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  }

  const stepLabels = ["Entradas", "Datos", "Pago"];

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="sheet-handle" />
        <div className="sheet-inner">

          {/* ── SUCCESS ── */}
          {done ? (
            <>
              <div className="success-header">
                <div className="success-ico">🎉</div>
                <div className="success-title">¡Sos parte del show!</div>
                <div className="success-sub">
                  Tu entrada llegó a <strong style={{ color: "#fff" }}>{buyer.email}</strong>.<br />
                  Presentá el QR en la puerta.
                </div>
              </div>

              <div className="ticket">
                <div className="ticket-art">
                  <div className="ticket-art-bg"><EventArt ev={ev} /></div>
                  <div className="ticket-art-overlay" />
                  <div className="ticket-art-name">{ev.artist}</div>
                </div>
                <div className="ticket-perf" />
                <div className="ticket-body">
                  <div className="ticket-grid">
                    <div className="ticket-field"><label>Fecha</label><span>{ev.day} {ev.month}</span></div>
                    <div className="ticket-field"><label>Hora</label><span>{ev.time}</span></div>
                    <div className="ticket-field"><label>Lugar</label><span>{ev.venue}</span></div>
                    <div className="ticket-field"><label>Titular</label><span>{buyer.name}</span></div>
                  </div>
                  <div className="ticket-qr-row">
                    <div className="ticket-qr-box">⬛</div>
                    <div className="ticket-qr-info">
                      <div className="ticket-qr-label">Token de acceso</div>
                      <div className="ticket-hash">{hash}</div>
                    </div>
                  </div>
                </div>
                <div className="ticket-foot">
                  <span className="ticket-status">✓ Válido</span>
                  <span className="ticket-amount">{fmt(subtotal)}</span>
                </div>
              </div>

              <button className="sheet-btn" style={{ marginTop: 24 }} onClick={onClose}>
                Listo
              </button>
            </>

          ) : (
            <>
              <div className="sheet-title">
                {step === 1 ? "Elegí tus entradas" : step === 2 ? "Tus datos" : "Confirmá el pago"}
              </div>
              <div className="sheet-sub">{ev.artist} · {ev.day} {ev.month} · {ev.venue}</div>

              <div className="step-dots">
                {stepLabels.map((_, i) => (
                  <div key={i} className={`step-dot ${step === i + 1 ? "on" : "off"}`} />
                ))}
              </div>

              {/* STEP 1 — Entradas */}
              {step === 1 && (
                <>
                  <div className="tt-list">
                    {ev.types.map(t => {
                      const q   = qty[t.id] || 0;
                      const few = t.avail <= 20;
                      return (
                        <div
                          key={t.id}
                          className={`tt-card ${q > 0 ? "selected" : ""}`}
                          onClick={() => !q && setQ(t.id, 1)}
                        >
                          <div className="tt-card-info">
                            <div className="tt-card-name">{t.name}</div>
                            <div className="tt-card-desc">{t.desc}</div>
                            <div className={`tt-card-avail ${few ? "few" : ""}`}>
                              {few ? `⚠ Solo ${t.avail} disponibles` : `${t.avail} disponibles`}
                            </div>
                          </div>
                          <div className="tt-card-right">
                            <div className="tt-card-price">{fmt(t.price)}</div>
                            <div className="tt-qty">
                              <button
                                className="tt-qbtn"
                                onClick={e => { e.stopPropagation(); setQ(t.id, -1); }}
                                disabled={!q}
                              >−</button>
                              <span className="tt-qval">{q}</span>
                              <button
                                className="tt-qbtn"
                                onClick={e => { e.stopPropagation(); setQ(t.id, 1); }}
                                disabled={q >= t.avail}
                              >+</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {canNext2 && (
                    <div className="summary">
                      {ev.types.filter(t => qty[t.id] > 0).map(t => (
                        <div className="sum-row" key={t.id}>
                          <span className="sum-lbl">{t.name} × {qty[t.id]}</span>
                          <span className="sum-val">{fmt(t.price * qty[t.id])}</span>
                        </div>
                      ))}
                      <div className="sum-row">
                        <span className="sum-lbl">Cargo de servicio</span>
                        <span className="sum-val">{fmt(fee)}</span>
                      </div>
                      <div className="sum-divider" />
                      <div className="sum-total">
                        <span>Total</span>
                        <span className="sum-total-val">{fmt(total)}</span>
                      </div>
                    </div>
                  )}

                  <button className="sheet-btn" disabled={!canNext2} onClick={() => setStep(2)}>
                    {canNext2 ? `Continuar — ${fmt(total)}` : "Seleccioná una entrada"}
                  </button>
                </>
              )}

              {/* STEP 2 — Datos */}
              {step === 2 && (
                <>
                  <div className="form-g">
                    <label className="form-lbl">Nombre completo</label>
                    <input
                      className="form-inp"
                      placeholder="Valentina Rossi"
                      value={buyer.name}
                      onChange={e => setBuyer(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-g">
                    <label className="form-lbl">Email</label>
                    <input
                      className="form-inp"
                      type="email"
                      placeholder="valen@mail.com"
                      value={buyer.email}
                      onChange={e => setBuyer(p => ({ ...p, email: e.target.value }))}
                    />
                    <div className="form-hint">Tu entrada llega acá</div>
                  </div>
                  <div className="form-g">
                    <label className="form-lbl">DNI</label>
                    <input
                      className="form-inp"
                      placeholder="32.456.789"
                      value={buyer.dni}
                      onChange={e => setBuyer(p => ({ ...p, dni: e.target.value }))}
                    />
                  </div>
                  <div className="summary">
                    <div className="sum-total">
                      <span>Total</span>
                      <span className="sum-total-val">{fmt(total)}</span>
                    </div>
                  </div>
                  <button className="sheet-btn" disabled={!canNext3} onClick={() => setStep(3)}>
                    Continuar
                  </button>
                  <button className="sheet-btn ghost" onClick={() => setStep(1)}>Volver</button>
                </>
              )}

              {/* STEP 3 — Pago */}
              {step === 3 && (
                <>
                  <div className="summary">
                    {ev.types.filter(t => qty[t.id] > 0).map(t => (
                      <div className="sum-row" key={t.id}>
                        <span className="sum-lbl">{t.name} × {qty[t.id]}</span>
                        <span className="sum-val">{fmt(t.price * qty[t.id])}</span>
                      </div>
                    ))}
                    <div className="sum-row">
                      <span className="sum-lbl">Cargo de servicio (8%)</span>
                      <span className="sum-val">{fmt(fee)}</span>
                    </div>
                    <div className="sum-divider" />
                    <div className="sum-total">
                      <span>Total</span>
                      <span className="sum-total-val">{fmt(total)}</span>
                    </div>
                    <div className="split-note">
                      Pago seguro con Mercado Pago. El organizador recibe {fmt(subtotal)} de forma inmediata al confirmar tu compra.
                    </div>
                  </div>

                  <button className="sheet-btn" onClick={pay} disabled={loading}>
                    {loading ? "Procesando…" : `Pagar ${fmt(total)} con Mercado Pago`}
                  </button>
                  <button className="sheet-btn ghost" onClick={() => setStep(2)}>Volver</button>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── EVENT PAGE ── */
function EventPage({ ev, onBack }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [navSolid, setNavSolid]         = useState(false);
  const minPrice = Math.min(...ev.types.map(t => t.price));

  useEffect(() => {
    const el = document.getElementById("app-scroll");
    const fn = () => setNavSolid((el?.scrollTop || 0) > 60);
    el?.addEventListener("scroll", fn);
    return () => el?.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${navSolid ? "solid" : ""}`}>
        <button className="nav-icon-btn" onClick={onBack}>←</button>
        <div className="nav-logo" style={{ opacity: navSolid ? 1 : 0, transition: "opacity .3s" }}>
          Fluxo
        </div>
        <button className="nav-icon-btn">↑</button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-art">
          <EventArt ev={ev} />
        </div>
        <div className="hero-gradient-top" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-dot" />
            {ev.tag}
          </div>
          <div className="hero-artist">{ev.artist}</div>
          <div className="hero-meta">
            <span>{ev.day} de {ev.month}</span>
            <span className="hero-meta-sep">·</span>
            <span>{ev.time}</span>
            <span className="hero-meta-sep">·</span>
            <span>{ev.venue}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="page-content">

        {/* INFO TILES */}
        <div className="section">
          <div className="info-tiles">
            <div className="info-tile">
              <div className="info-tile-icon">📅</div>
              <div className="info-tile-body">
                <div className="info-tile-label">Fecha</div>
                <div className="info-tile-val">{ev.day} de {ev.month} de {ev.year}</div>
                <div className="info-tile-sub">Puertas: {ev.doors} hs</div>
              </div>
              <div className="info-tile-right">›</div>
            </div>
            <div className="info-tile">
              <div className="info-tile-icon">📍</div>
              <div className="info-tile-body">
                <div className="info-tile-label">Lugar</div>
                <div className="info-tile-val">{ev.venue}</div>
                <div className="info-tile-sub">{ev.city}</div>
              </div>
              <div className="info-tile-right">›</div>
            </div>
            <div className="info-tile">
              <div className="info-tile-icon">⏰</div>
              <div className="info-tile-body">
                <div className="info-tile-label">Horario del show</div>
                <div className="info-tile-val">{ev.time} hs</div>
                <div className="info-tile-sub">Duración estimada: 2:30 hs</div>
              </div>
              <div className="info-tile-right">›</div>
            </div>
          </div>
        </div>

        {/* LINEUP */}
        <div className="section">
          <div className="section-label">Lineup</div>
          <div className="lineup-list">
            {ev.lineup.map((a, i) => (
              <div key={i} className="lineup-item">
                <div className="lineup-avatar">
                  <div
                    className="lineup-avatar-art"
                    style={{ background: `radial-gradient(circle, ${ev.color2}88, ${ev.color1})` }}
                  >
                    {a.emoji}
                  </div>
                </div>
                <div className="lineup-info">
                  <div className="lineup-name">{a.name}</div>
                  <div className="lineup-role">{a.role}</div>
                </div>
                <div className="lineup-arrow">›</div>
              </div>
            ))}
          </div>
        </div>

        {/* ENTRADAS PREVIEW */}
        <div className="section">
          <div className="section-label">Entradas disponibles</div>
          <div className="tt-list">
            {ev.types.map(t => {
              const few = t.avail <= 20;
              return (
                <div key={t.id} className="tt-card" onClick={() => setShowCheckout(true)}>
                  <div className="tt-card-info">
                    <div className="tt-card-name">{t.name}</div>
                    <div className="tt-card-desc">{t.desc}</div>
                    <div className={`tt-card-avail ${few ? "few" : ""}`}>
                      {few ? `⚠ Solo ${t.avail} disponibles` : `${t.avail} disponibles`}
                    </div>
                  </div>
                  <div className="tt-card-right">
                    <div className="tt-card-price">{fmt(t.price)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAPA */}
        <div className="section">
          <div className="section-label">Ubicación</div>
          <div className="map-box">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📍</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{ev.venue}</div>
              <div style={{ fontSize: 12, color: "var(--off)", marginTop: 3 }}>{ev.city}</div>
            </div>
          </div>
          <button className="map-btn">Abrir en Maps ↗</button>
        </div>

      </div>

      {/* STICKY BUY BAR */}
      <div className="buy-bar">
        <div className="buy-bar-price">
          <div className="buy-bar-from">Desde</div>
          <div className="buy-bar-val">{fmt(minPrice)}</div>
        </div>
        <button className="buy-bar-btn" onClick={() => setShowCheckout(true)}>
          Comprar entrada
        </button>
      </div>

      {showCheckout && <CheckoutSheet event={ev} onClose={() => setShowCheckout(false)} />}
    </>
  );
}

/* ── HOME ── */
function Home({ onSelect }) {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const el = document.getElementById("app-scroll");
    const fn = () => setNavSolid((el?.scrollTop || 0) > 20);
    el?.addEventListener("scroll", fn);
    return () => el?.removeEventListener("scroll", fn);
  }, []);

  const featured = EVENTS[0];
  const rest     = EVENTS.slice(1);

  return (
    <>
      <nav className={`nav ${navSolid ? "solid" : ""}`}>
        <div className="nav-logo">Fluxo</div>
        <div className="nav-actions">
          <button className="nav-icon-btn">🔍</button>
          <button className="nav-icon-btn">👤</button>
        </div>
      </nav>

      {/* FEATURED */}
      <div style={{ padding: "68px 0 0", cursor: "pointer" }} onClick={() => onSelect(featured)}>
        <div style={{ position: "relative", height: 380, overflow: "hidden" }}>
          <EventArt ev={featured} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(14,14,14,0) 30%, rgba(14,14,14,.9) 100%)",
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 22px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,.1)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,.15)",
              padding: "4px 11px", borderRadius: 100,
              fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
              marginBottom: 10, color: "#fff",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
              {featured.tag}
            </div>
            <div style={{
              fontFamily: "var(--ff)", fontSize: 32, fontWeight: 900,
              lineHeight: .97, letterSpacing: "-.4px", marginBottom: 10,
              textShadow: "0 2px 16px rgba(0,0,0,.5)",
            }}>{featured.artist}</div>
            <div style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,.6)", flexWrap: "wrap" }}>
              <span>{featured.day} {featured.month}</span>
              <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>
              <span>{featured.venue}</span>
              <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>
              <span>Desde {fmt(Math.min(...featured.types.map(t => t.price)))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* REST */}
      <div style={{ padding: "8px 0 80px" }}>
        <div style={{
          padding: "18px 20px 12px",
          fontSize: 11, fontWeight: 700, letterSpacing: 2,
          textTransform: "uppercase", color: "rgba(255,255,255,.3)",
        }}>Más eventos</div>

        {rest.map(ev => {
          const minPrice = Math.min(...ev.types.map(t => t.price));
          return (
            <div
              key={ev.id}
              onClick={() => onSelect(ev)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 20px", cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,.06)",
                transition: "background .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.03)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 12, overflow: "hidden", flexShrink: 0,
                background: `radial-gradient(circle at 60% 40%, ${ev.color3}55, ${ev.color2} 60%, ${ev.color1})`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
              }}>{ev.emoji}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginBottom: 3, fontWeight: 500, letterSpacing: .5 }}>
                  {ev.tag}
                </div>
                <div style={{
                  fontSize: 16, fontWeight: 800, marginBottom: 3, letterSpacing: "-.2px",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{ev.artist}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
                  {ev.venue} · {ev.day} {ev.month}
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>Desde</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{fmt(minPrice)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ── ROOT ── */
export default function App() {
  const [page, setPage]             = useState("home");
  const [currentEvent, setCurrentEvent] = useState(null);

  function goEvent(ev) { setCurrentEvent(ev); setPage("event"); }
  function goHome()    { setCurrentEvent(null); setPage("home"); }

  return (
    <>
      <style>{CSS}</style>
      <div
        id="app-scroll"
        style={{
          background: "var(--bg)", minHeight: "100vh",
          maxWidth: 430, margin: "0 auto",
          overflowY: "auto", height: "100dvh",
          position: "relative",
        }}
      >
        {page === "home"  && <Home onSelect={goEvent} />}
        {page === "event" && currentEvent && <EventPage ev={currentEvent} onBack={goHome} />}
      </div>
    </>
  );
}
