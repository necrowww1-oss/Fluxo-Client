import{useState,useEffect,useRef}from"react";

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
--bg:#0e0e0e;--sur:#1a1a1a;--sur2:#242424;
--b:rgba(255,255,255,.1);--b2:rgba(255,255,255,.06);
--white:#fff;--off:rgba(255,255,255,.55);--dim:rgba(255,255,255,.3);
--pill:rgba(255,255,255,.1);--pillh:rgba(255,255,255,.16);
--ff:'Figtree',system-ui,sans-serif;--ease:cubic-bezier(.16,1,.3,1);
}
html{background:var(--bg);scroll-behavior:smooth;}
body{font-family:var(--ff);background:var(--bg);color:var(--white);-webkit-font-smoothing:antialiased;min-height:100vh;max-width:430px;margin:0 auto;}
::-webkit-scrollbar{width:0;}
/* NAV */
.nav{position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;z-index:90;display:flex;align-items:center;justify-content:space-between;padding:0 18px;height:56px;transition:background .3s;pointer-events:none;}
.nav.solid{background:rgba(14,14,14,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--b2);}
.nav-logo{font-size:19px;font-weight:800;letter-spacing:-.4px;}
.nav-actions{display:flex;align-items:center;gap:10px;}
.nav-btn{width:36px;height:36px;border-radius:50%;background:var(--pill);border:none;cursor:pointer;color:var(--white);font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .15s,transform .15s;pointer-events:auto;}
.nav-btn:hover{background:var(--pillh);}
.nav-btn:active{transform:scale(.88);}
/* HERO */
.hero{position:relative;height:calc(100dvh - 56px);max-height:624px;min-height:444px;}
.hero-art{position:absolute;inset:0;overflow:hidden;}
.hero-grad{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,14,14,0) 0%,rgba(14,14,14,.1) 40%,rgba(14,14,14,.75) 70%,rgba(14,14,14,1) 100%);z-index:2;pointer-events:none;}
.hero-grad-top{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,14,14,.5) 0%,transparent 30%);z-index:2;pointer-events:none;}
.hero-content{position:absolute;bottom:0;left:0;right:0;padding:0 20px 20px;z-index:3;}
.hero-tag{display:inline-flex;align-items:center;gap:6px;background:var(--pill);backdrop-filter:blur(12px);border:1px solid var(--b);padding:5px 12px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;}
.hero-dot{width:5px;height:5px;border-radius:50%;background:#fff;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.hero-artist{font-size:clamp(32px,8vw,48px);font-weight:900;line-height:.96;letter-spacing:-.5px;margin-bottom:8px;text-shadow:0 2px 20px rgba(0,0,0,.4);}
.hero-meta{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--off);flex-wrap:wrap;margin-bottom:14px;}
.hero-sep{color:var(--dim);}
.hero-buy{width:100%;padding:14px 20px;border-radius:14px;border:none;cursor:pointer;font-family:var(--ff);font-size:15px;font-weight:700;background:#fff;color:#0e0e0e;transition:transform .15s,opacity .15s;}
.hero-buy:hover{transform:scale(1.02);}
.hero-buy:active{transform:scale(.98);}
/* BOTTOM BAR */
.buy-bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(14,14,14,.9);backdrop-filter:blur(20px);border-top:1px solid var(--b2);padding:14px 18px;display:flex;align-items:center;gap:12px;z-index:80;}
.buy-from{font-size:11px;color:var(--dim);margin-bottom:2px;}
.buy-val{font-size:20px;font-weight:800;letter-spacing:-.4px;}
.buy-btn{flex:2;padding:14px 20px;border-radius:14px;border:none;cursor:pointer;font-family:var(--ff);font-size:15px;font-weight:700;background:var(--white);color:var(--bg);transition:transform .15s,opacity .15s;}
.buy-btn:hover{transform:scale(1.02);}
.buy-btn:active{transform:scale(.98);}
/* CONTENT */
.page-content{padding:4px 0 100px;}
.section{padding:24px 20px;border-bottom:1px solid var(--b2);}
.section:last-child{border-bottom:none;}
.sec-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);margin-bottom:14px;}
.info-tile{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--b2);}
.info-tile:last-child{border-bottom:none;}
.info-ico{width:40px;height:40px;border-radius:12px;background:var(--sur2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.info-body{flex:1;}
.info-lbl{font-size:11px;color:var(--dim);margin-bottom:3px;font-weight:500;}
.info-val{font-size:15px;font-weight:600;}
.info-sub{font-size:12px;color:var(--off);margin-top:1px;}
.lineup-item{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--b2);}
.lineup-item:last-child{border-bottom:none;}
.lineup-ava{width:48px;height:48px;border-radius:50%;overflow:hidden;flex-shrink:0;}
.lineup-name{font-size:15px;font-weight:700;margin-bottom:3px;}
.lineup-role{font-size:12px;color:var(--off);}
.tt-list{display:flex;flex-direction:column;gap:10px;}
.tt-card{background:var(--sur);border:1px solid var(--b2);border-radius:16px;padding:18px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:border-color .2s,background .2s;position:relative;}
.tt-card::before{content:'';position:absolute;inset:0;border-radius:16px;background:rgba(255,255,255,0);transition:background .2s;pointer-events:none;}
.tt-card:hover::before{background:rgba(255,255,255,.04);}
.tt-card.sel{border-color:var(--white);background:var(--sur2);}
.tt-info{flex:1;}
.tt-name{font-size:15px;font-weight:700;margin-bottom:4px;}
.tt-desc{font-size:12px;color:var(--off);line-height:1.4;}
.tt-avail{font-size:11px;color:var(--dim);margin-top:5px;font-weight:500;}
.tt-avail.few{color:#fb923c;}
.tt-right{text-align:right;flex-shrink:0;position:relative;z-index:2;}
.tt-price{font-size:17px;font-weight:800;margin-bottom:8px;}
.tt-qty{display:flex;align-items:center;gap:10px;justify-content:flex-end;position:relative;z-index:3;}
.tt-qbtn{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--b);background:transparent;color:var(--white);font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;line-height:1;}
.tt-qbtn:hover{border-color:var(--white);background:var(--pillh);}
.tt-qval{font-size:15px;font-weight:700;min-width:20px;text-align:center;}
.map-box{border-radius:16px;overflow:hidden;background:var(--sur);height:160px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;border:1px solid var(--b2);}
.map-btn{width:100%;padding:13px;border-radius:12px;border:1px solid var(--b);background:transparent;color:var(--white);font-family:var(--ff);font-size:13px;font-weight:600;cursor:pointer;transition:background .15s;}
.map-btn:hover{background:var(--pillh);}
/* SHEET */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(10px);z-index:9999;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;}
.sheet{position:relative;width:100%;max-width:430px;background:#141414;border-radius:24px 24px 0 0;min-height:50vh;max-height:92dvh;overflow-y:auto;z-index:10000;animation:sheetUp .35s cubic-bezier(.16,1,.3,1);}
@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes sheetDown{from{transform:translateY(0)}to{transform:translateY(100%)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes overlayOut{from{opacity:1}to{opacity:0}}
@keyframes searchOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.98) translateY(-8px)}}
@keyframes pageIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.8) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes qtyPop{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}
.sh{width:36px;height:4px;border-radius:2px;background:var(--b);margin:14px auto 0;}
.si{padding:20px 20px 40px;}
.s-title{font-size:22px;font-weight:800;letter-spacing:-.4px;margin-bottom:4px;}
.s-sub{font-size:13px;color:var(--off);margin-bottom:24px;}
.steps{display:flex;gap:6px;margin-bottom:26px;}
.step{height:3px;border-radius:2px;transition:all .3s;}
.step.on{background:var(--white);flex:2;}
.step.off{background:var(--b);flex:1;}
.fg{margin-bottom:14px;}
.fl{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--dim);margin-bottom:8px;}
.fi{width:100%;padding:14px 16px;background:var(--sur2);border:1px solid var(--b2);border-radius:12px;color:var(--white);font-family:var(--ff);font-size:15px;font-weight:500;outline:none;transition:border-color .15s;}
.fi:focus{border-color:rgba(255,255,255,.4);}
.fi::placeholder{color:rgba(255,255,255,.2);}
.fhint{font-size:11px;color:var(--dim);margin-top:6px;}
.sum{background:var(--sur2);border-radius:14px;padding:16px;margin:16px 0;}
.sumr{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;}
.suml{color:var(--off);}
.sumv{font-weight:600;}
.sumd{height:1px;background:var(--b2);margin:10px 0;}
.sumt{display:flex;justify-content:space-between;font-size:16px;font-weight:800;}
.sumtv{font-size:20px;}
.split{margin-top:10px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid var(--b2);font-size:11px;color:var(--dim);line-height:1.6;}
.sbtn{width:100%;padding:16px;border-radius:14px;border:none;font-family:var(--ff);font-size:16px;font-weight:800;background:var(--white);color:var(--bg);cursor:pointer;transition:all .15s;letter-spacing:-.2px;margin-top:12px;}
.sbtn:hover{opacity:.9;transform:scale(1.01);}
.sbtn:disabled{opacity:.3;cursor:not-allowed;transform:none;}
.sbtn.ghost{background:transparent;color:var(--off);border:1px solid var(--b2);font-size:14px;font-weight:600;}
.sbtn.ghost:hover{background:var(--pillh);color:var(--white);opacity:1;transform:none;}
.ticket{border-radius:18px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.5);margin:0 auto;max-width:340px;}
.tka{height:160px;display:flex;align-items:flex-end;padding:16px 20px;position:relative;overflow:hidden;}
.tka-bg{position:absolute;inset:0;}
.tka-ov{position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.7) 100%);}
.tka-n{position:relative;z-index:1;font-size:22px;font-weight:900;letter-spacing:-.3px;line-height:1.05;text-shadow:0 2px 12px rgba(0,0,0,.5);}
.tkp{height:1px;background:repeating-linear-gradient(90deg,#111 0,#111 7px,#1f1f1f 7px,#1f1f1f 13px);background-color:#1a1a1a;position:relative;}
.tkp::before,.tkp::after{content:'';position:absolute;width:22px;height:22px;border-radius:50%;background:#141414;top:-11px;}
.tkp::before{left:-11px;}
.tkp::after{right:-11px;}
.tkb{background:#1a1a1a;padding:18px 20px 22px;}
.tkg{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px;}
.tkf label{display:block;font-size:8px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.3);margin-bottom:3px;}
.tkf span{font-size:12px;font-weight:700;}
.tkqr{display:flex;gap:14px;align-items:center;background:rgba(255,255,255,.04);border-radius:12px;padding:14px;}
.tkqrb{width:80px;height:80px;border-radius:8px;background:var(--white);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:30px;}
.tkqi{flex:1;min-width:0;}
.tkql{font-size:10px;color:var(--dim);margin-bottom:4px;font-weight:600;text-transform:uppercase;letter-spacing:1px;}
.tkh{font-size:8px;color:var(--dim);word-break:break-all;line-height:1.5;}
.tkft{background:#141414;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.06);}
.tkst{font-size:11px;font-weight:700;color:#4ade80;letter-spacing:.5px;}
.tkamt{font-size:15px;font-weight:800;}
.suc-hd{text-align:center;padding:20px 0 24px;}
.suc-ico{width:60px;height:60px;border-radius:50%;background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 16px;animation:popIn .5s .1s var(--ease) both;}
.suc-title{font-size:24px;font-weight:900;margin-bottom:6px;letter-spacing:-.3px;}
.suc-sub{font-size:13px;color:var(--off);line-height:1.6;}
.page-enter{animation:pageIn .32s var(--ease) both;}
`;

const EVENTS=[
  {id:"e1",artist:"Marilina Bertoldi & Alok",tag:"Electrónica · Rock",venue:"Club Niceto",city:"Palermo, CABA",day:"28",month:"MAR",year:"2025",time:"23:00",doors:"22:00",emoji:"🎧",c1:"#1a0533",c2:"#6b21a8",c3:"#c084fc",
   lineup:[{name:"Marilina Bertoldi",role:"Headliner",emoji:"🎤"},{name:"Alok",role:"DJ Set",emoji:"🎛️"},{name:"VTSS",role:"Telonero",emoji:"💿"}],
   types:[{id:"t1",name:"General",price:9500,desc:"Acceso piso principal",avail:63},{id:"t2",name:"VIP",price:24000,desc:"Sector preferencial + 1 trago incluido",avail:8}]},
  {id:"e2",artist:"Cuarteto del Norte",tag:"Folklore · Cuarteto",venue:"Ópera Córdoba",city:"Nueva Córdoba, CBA",day:"04",month:"ABR",year:"2025",time:"21:00",doors:"20:00",emoji:"🎶",c1:"#1c0a00",c2:"#9a3412",c3:"#fb923c",
   lineup:[{name:"Cuarteto del Norte",role:"Artista principal",emoji:"🎶"},{name:"Los Palmeras Jr.",role:"Invitados",emoji:"🌴"}],
   types:[{id:"t3",name:"Campo",price:8000,desc:"Acceso campo frente al escenario",avail:200},{id:"t4",name:"Platea A",price:18000,desc:"Butacas premium con vista directa",avail:22}]},
  {id:"e3",artist:"La Gaviota",tag:"Teatro · Drama",venue:"Teatro Picadero",city:"Palermo, CABA",day:"29",month:"MAR",year:"2025",time:"20:30",doors:"20:00",emoji:"🎭",c1:"#0a0f1a",c2:"#1e3a5f",c3:"#60a5fa",
   lineup:[{name:"Elenco estable",role:"Actuación",emoji:"🎭"},{name:"Dir. Cecilia Vars",role:"Dirección",emoji:"🎬"}],
   types:[{id:"t5",name:"Platea",price:14000,desc:"Butacas centrales fila 1-10",avail:40},{id:"t6",name:"Paraíso",price:7500,desc:"Sector superior",avail:80}]},
];

const fmt=n=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
const FEE=0.08;

function Art({ev}){
  return <div style={{width:"100%",height:"100%",background:`radial-gradient(ellipse 80% 80% at 60% 30%,${ev.c3}55 0%,${ev.c2} 45%,${ev.c1} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80}}>{ev.emoji}</div>;
}

function QtyNum({val}){
  const[anim,setAnim]=useState(false);
  const prev=useRef(val);
  useEffect(()=>{
    if(val!==prev.current){setAnim(true);prev.current=val;setTimeout(()=>setAnim(false),260);}
  },[val]);
  return <span className="tt-qval" style={{animation:anim?"qtyPop .25s cubic-bezier(.34,1.56,.64,1)":undefined,display:"inline-block"}}>{val}</span>;
}

function Checkout({ev,onClose}){
  const[closing,setClosing]=useState(false);
  function close(){setClosing(true);setTimeout(onClose,300);}
  useEffect(()=>{
    const scr=document.getElementById("scr");
    if(scr)scr.style.overflow="hidden";
    return()=>{if(scr)scr.style.overflow="auto";};
  },[]);
  const[step,setStep]=useState(1);
  const[qty,setQty]=useState({});
  const[buyer,setBuyer]=useState({name:"",email:"",dni:""});
  const[loading,setLoading]=useState(false);
  const[done,setDone]=useState(false);
  const[hash]=useState(`hmac_${Math.random().toString(36).slice(2,10)}${Math.random().toString(36).slice(2,8)}`);
  const totalQ=Object.values(qty).reduce((a,b)=>a+b,0);
  const sub=ev.types.reduce((s,t)=>s+(qty[t.id]||0)*t.price,0);
  const fee=Math.round(sub*FEE);
  const total=sub+fee;
  function setQ(id,delta){setQty(prev=>{const t=ev.types.find(x=>x.id===id);const max=t?t.avail:99;return{...prev,[id]:Math.max(0,Math.min(max,(prev[id]||0)+delta))};});}
  function pay(){setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},2000);}
  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&close()} style={{animation:closing?"overlayOut .3s ease forwards":undefined}}>
      <div className="sheet">
        <div className="sh"/>
        <div className="si">
          {done?(
            <>
              <div className="suc-hd">
                <div className="suc-ico">🎉</div>
                <div className="suc-title">¡Sos parte del show!</div>
                <div className="suc-sub">Tu entrada llegó a <strong style={{color:"#fff"}}>{buyer.email}</strong>.<br/>Presentá el QR en la puerta.</div>
              </div>
              <div className="ticket">
                <div className="tka"><div className="tka-bg"><Art ev={ev}/></div><div className="tka-ov"/><div className="tka-n">{ev.artist}</div></div>
                <div className="tkp"/>
                <div className="tkb">
                  <div className="tkg">
                    <div className="tkf"><label>Fecha</label><span>{ev.day} {ev.month}</span></div>
                    <div className="tkf"><label>Hora</label><span>{ev.time}</span></div>
                    <div className="tkf"><label>Lugar</label><span>{ev.venue}</span></div>
                    <div className="tkf"><label>Titular</label><span>{buyer.name}</span></div>
                  </div>
                  <div className="tkqr"><div className="tkqrb">⬛</div><div className="tkqi"><div className="tkql">Token de acceso</div><div className="tkh">{hash}</div></div></div>
                </div>
                <div className="tkft"><span className="tkst">✓ Válido</span><span className="tkamt">{fmt(sub)}</span></div>
              </div>
              <button className="sbtn" style={{marginTop:24}} onClick={close}>Listo</button>
            </>
          ):(
            <>
              <div className="s-title">{step===1?"Elegí tus entradas":step===2?"Tus datos":"Confirmá el pago"}</div>
              <div className="s-sub">{ev.artist} · {ev.day} {ev.month} · {ev.venue}</div>
              <div className="steps">{[1,2,3].map(i=><div key={i} className={`step ${step===i?"on":"off"}`}/>)}</div>
              {step===1&&(
                <>
                  <div className="tt-list">
                    {ev.types.map(t=>{
                      const q=qty[t.id]||0;
                      const few=t.avail<=8;
                      return(
                        <div key={t.id} className={`tt-card ${q>0?"sel":""}`} onClick={()=>!q&&setQ(t.id,1)}>
                          <div className="tt-info">
                            <div className="tt-name">{t.name}</div>
                            <div className="tt-desc">{t.desc}</div>
                            <div className={`tt-avail${few?" few":""}`}>{few?`⚠ ¡Solo ${t.avail} disponibles!`:`${t.avail} disponibles`}</div>
                          </div>
                          <div className="tt-right">
                            <div className="tt-price">{fmt(t.price)}</div>
                            <div className="tt-qty" onClick={e=>e.stopPropagation()}>
                              <button className="tt-qbtn" onClick={e=>{e.stopPropagation();setQ(t.id,-1);}} style={{opacity:q>0?1:.3,cursor:q>0?"pointer":"not-allowed"}}>−</button>
                              <QtyNum val={q}/>
                              <button className="tt-qbtn" onClick={e=>{e.stopPropagation();setQ(t.id,1);}} style={{opacity:q<t.avail?1:.3,cursor:q<t.avail?"pointer":"not-allowed"}}>+</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {totalQ>0&&(
                    <div className="sum">
                      {ev.types.filter(t=>qty[t.id]>0).map(t=><div className="sumr" key={t.id}><span className="suml">{t.name} × {qty[t.id]}</span><span className="sumv">{fmt(t.price*qty[t.id])}</span></div>)}
                      <div className="sumr"><span className="suml">Cargo de servicio</span><span className="sumv">{fmt(fee)}</span></div>
                      <div className="sumd"/>
                      <div className="sumt"><span>Total</span><span className="sumtv">{fmt(total)}</span></div>
                    </div>
                  )}
                  <button className="sbtn" disabled={!totalQ} onClick={()=>setStep(2)}>{totalQ?`Continuar — ${fmt(total)}`:"Seleccioná una entrada"}</button>
                </>
              )}
              {step===2&&(
                <>
                  <div className="fg"><label className="fl">Nombre completo</label><input className="fi" placeholder="Valentina Rossi" value={buyer.name} onChange={e=>setBuyer(p=>({...p,name:e.target.value}))}/></div>
                  <div className="fg"><label className="fl">Email</label><input className="fi" type="email" placeholder="valen@mail.com" value={buyer.email} onChange={e=>setBuyer(p=>({...p,email:e.target.value}))}/><div className="fhint">Tu entrada llega acá</div></div>
                  <div className="fg"><label className="fl">DNI</label><input className="fi" placeholder="32.456.789" value={buyer.dni} onChange={e=>setBuyer(p=>({...p,dni:e.target.value}))}/></div>
                  <div className="sum"><div className="sumt"><span>Total</span><span className="sumtv">{fmt(total)}</span></div></div>
                  <button className="sbtn" disabled={!(buyer.name.trim()&&buyer.email.includes("@")&&buyer.dni.trim())} onClick={()=>setStep(3)}>Continuar</button>
                  <button className="sbtn ghost" onClick={()=>setStep(1)}>Volver</button>
                </>
              )}
              {step===3&&(
                <>
                  <div className="sum">
                    {ev.types.filter(t=>qty[t.id]>0).map(t=><div className="sumr" key={t.id}><span className="suml">{t.name} × {qty[t.id]}</span><span className="sumv">{fmt(t.price*qty[t.id])}</span></div>)}
                    <div className="sumr"><span className="suml">Cargo de servicio (8%)</span><span className="sumv">{fmt(fee)}</span></div>
                    <div className="sumd"/>
                    <div className="sumt"><span>Total</span><span className="sumtv">{fmt(total)}</span></div>
                    <div className="split">Pago seguro con Mercado Pago. El organizador recibe {fmt(sub)} de forma inmediata.</div>
                  </div>
                  <button className="sbtn" onClick={pay} disabled={loading}>{loading?"Procesando…":`Pagar ${fmt(total)} con Mercado Pago`}</button>
                  <button className="sbtn ghost" onClick={()=>setStep(2)}>Volver</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function UserModal({onClose}){
  const[closing,setClosing]=useState(false);
  function close(){setClosing(true);setTimeout(onClose,300);}
  return(
    <div onClick={close} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.8)",backdropFilter:"blur(16px)",display:"flex",alignItems:"flex-end",animation:closing?"overlayOut .3s ease forwards":"fadeIn .2s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#1a1a1a",width:"100%",maxWidth:430,margin:"0 auto",borderRadius:"20px 20px 0 0",padding:"20px 20px 44px",border:"1px solid rgba(255,255,255,.1)",animation:closing?"sheetDown .3s var(--ease) forwards":"sheetUp .34s var(--ease)"}}>
        <div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,.15)",margin:"0 auto 24px"}}/>
        <div style={{fontSize:44,textAlign:"center",marginBottom:12}}>🎟</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:"center",marginBottom:8}}>Tus tickets</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.5)",textAlign:"center",lineHeight:1.7,marginBottom:28}}>Próximamente vas a poder iniciar sesión para ver el historial de todas tus entradas compradas.</div>
        <button onClick={close} style={{width:"100%",padding:"15px",borderRadius:12,border:"none",background:"#fff",color:"#0e0e0e",fontFamily:"inherit",fontSize:15,fontWeight:800,cursor:"pointer"}}>Entendido</button>
      </div>
    </div>
  );
}

function SearchOverlay({onClose,onSelect}){
  const[closing,setClosing]=useState(false);
  const[q,setQ]=useState("");
  function close(){setClosing(true);setTimeout(onClose,280);}
  const MM={"01":"ENE","02":"FEB","03":"MAR","04":"ABR","05":"MAY","06":"JUN","07":"JUL","08":"AGO","09":"SEP","10":"OCT","11":"NOV","12":"DIC"};
  const results=q.trim()===""?[]:EVENTS.filter(ev=>{
    const ql=q.toLowerCase();
    const mM=Object.entries(MM).some(([n,s])=>ql.includes(n)||ql.includes(s.toLowerCase())||ql.includes(ev.month.toLowerCase()));
    const dM=ql.match(/\d+/)&&ev.day===ql.match(/\d+/)?.[0];
    return ev.artist.toLowerCase().includes(ql)||ev.venue.toLowerCase().includes(ql)||ev.tag.toLowerCase().includes(ql)||ev.city.toLowerCase().includes(ql)||mM||dM;
  });
  return(
    <div onClick={close} style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",animation:closing?"searchOut .28s ease forwards":undefined}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,1) 80px,rgba(0,0,0,.75) 100%)",backdropFilter:"blur(32px)",WebkitBackdropFilter:"blur(32px)",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1,background:"#0e0e0e",padding:"16px 18px 14px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div onClick={e=>e.stopPropagation()} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:12,padding:"12px 16px"}}>
            <span style={{fontSize:16}}>🔍</span>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por artista, lugar, fecha…" style={{flex:1,background:"none",border:"none",outline:"none",color:"#fff",fontFamily:"inherit",fontSize:15}}/>
            {q&&<button onClick={e=>{e.stopPropagation();setQ("");}} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:16,padding:0}}>✕</button>}
          </div>
          <button onClick={close} style={{background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:600}}>Cancelar</button>
        </div>
      </div>
      <div onClick={e=>e.stopPropagation()} style={{position:"relative",zIndex:1,flex:1,overflowY:"auto",padding:"0 18px"}}>
        {q.trim()===""
          ?<div style={{textAlign:"center",color:"rgba(255,255,255,.25)",fontSize:14,marginTop:40}}>Escribí artista, lugar o fecha (ej: "28 MAR")</div>
          :results.length===0
            ?<div style={{textAlign:"center",color:"rgba(255,255,255,.3)",fontSize:14,marginTop:40}}>Sin resultados para "{q}"</div>
            :results.map(ev=>(
              <div key={ev.id} onClick={()=>{onSelect(ev);close();}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.06)",cursor:"pointer"}}>
                <div style={{width:52,height:52,borderRadius:11,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,background:`radial-gradient(circle at 60% 40%,${ev.c3}55,${ev.c2} 60%,${ev.c1})`}}>{ev.emoji}</div>
                <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:2}}>{ev.artist}</div><div style={{fontSize:12,color:"rgba(255,255,255,.45)"}}>{ev.venue} · {ev.day} {ev.month}</div></div>
              </div>
            ))
        }
      </div>
    </div>
  );
}

function EventPage({ev,onBack}){
  const[showCO,setShowCO]=useState(false);
  const[inHero,setInHero]=useState(true);
  const heroRef=useRef(null);
  const contentRef=useRef(null);
  const minP=Math.min(...ev.types.map(t=>t.price));

  useEffect(()=>{
    const hero=heroRef.current;
    if(!hero)return;
    const obs=new IntersectionObserver(
      ([entry])=>setInHero(entry.isIntersecting),
      {root:document.getElementById("scr"),threshold:0.15}
    );
    obs.observe(hero);
    return()=>obs.disconnect();
  },[]);

  function scrollToggle(){
    const el=document.getElementById("scr");
    if(inHero){el?.scrollTo({top:el.scrollHeight,behavior:"smooth"});}
    else{el?.scrollTo({top:0,behavior:"smooth"});}
  }

  return(
    <>
    <div className="page-enter">
      {/* NAV — sticky, siempre visible */}
      <nav style={{position:"sticky",top:0,zIndex:90,width:"100%",background:"rgba(14,14,14,.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",height:56}}>
        <button className="nav-btn" onClick={onBack}>←</button>
        <div style={{fontSize:19,fontWeight:800,letterSpacing:"-.4px",opacity:0}}>Fluxo</div>
        <button className="nav-btn" onClick={scrollToggle} style={{fontSize:18}}>{inHero?"↓":"↑"}</button>
      </nav>

      {/* HERO — sin overflow:hidden para que el botón reciba clicks */}
      <div ref={heroRef} style={{position:"relative",height:"calc(100dvh - 56px)",maxHeight:624,minHeight:444}}>
        <div style={{position:"absolute",inset:0,overflow:"hidden",zIndex:0}}><Art ev={ev}/></div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(14,14,14,.5) 0%,transparent 30%)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(14,14,14,0) 0%,rgba(14,14,14,.1) 40%,rgba(14,14,14,.75) 70%,rgba(14,14,14,1) 100%)",zIndex:2,pointerEvents:"none"}}/>
        {/* HERO CONTENT con botón de compra */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 20px 20px",zIndex:99}}>
          <div className="hero-tag"><span className="hero-dot"/>{ev.tag}</div>
          <div className="hero-artist">{ev.artist}</div>
          <div className="hero-meta">
            <span>{ev.day} de {ev.month}</span><span className="hero-sep">·</span>
            <span>{ev.time}</span><span className="hero-sep">·</span>
            <span>{ev.venue}</span>
          </div>
          {/* BOTÓN DE COMPRA EN HERO */}
          <button className="hero-buy" onClick={()=>setShowCO(true)}>
            Comprar entrada — desde {fmt(minP)}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentRef} className="page-content">
        <div className="section">
          <div className="info-tile"><div className="info-ico">📅</div><div className="info-body"><div className="info-lbl">Fecha</div><div className="info-val">{ev.day} de {ev.month} de {ev.year}</div><div className="info-sub">Puertas: {ev.doors} hs</div></div></div>
          <div className="info-tile"><div className="info-ico">📍</div><div className="info-body"><div className="info-lbl">Lugar</div><div className="info-val">{ev.venue}</div><div className="info-sub">{ev.city}</div></div></div>
          <div className="info-tile"><div className="info-ico">⏰</div><div className="info-body"><div className="info-lbl">Horario</div><div className="info-val">{ev.time} hs</div><div className="info-sub">Duración estimada: 2:30 hs</div></div></div>
        </div>
        <div className="section">
          <div className="sec-label">Lineup</div>
          {ev.lineup.map((a,i)=>(
            <div key={i} className="lineup-item">
              <div className="lineup-ava"><div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,background:`radial-gradient(circle,${ev.c2}88,${ev.c1})`}}>{a.emoji}</div></div>
              <div><div className="lineup-name">{a.name}</div><div className="lineup-role">{a.role}</div></div>
            </div>
          ))}
        </div>
        <div className="section">
          <div className="sec-label">Entradas disponibles</div>
          <div className="tt-list">
            {ev.types.map(t=>{
              const few=t.avail<=8;
              return(
                <div key={t.id} className="tt-card" onClick={()=>setShowCO(true)}>
                  <div className="tt-info"><div className="tt-name">{t.name}</div><div className="tt-desc">{t.desc}</div><div className={`tt-avail${few?" few":""}`}>{few?`⚠ Solo ${t.avail} disponibles`:`${t.avail} disponibles`}</div></div>
                  <div className="tt-right"><div className="tt-price">{fmt(t.price)}</div></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="section">
          <div className="sec-label">Ubicación</div>
          <div className="map-box"><div style={{textAlign:"center"}}><div style={{fontSize:40,marginBottom:8}}>📍</div><div style={{fontSize:14,fontWeight:600}}>{ev.venue}</div><div style={{fontSize:12,color:"var(--off)",marginTop:3}}>{ev.city}</div></div></div>
          <button className="map-btn">Abrir en Maps ↗</button>
        </div>
      </div>

      {/* BOTTOM BUY BAR */}
      <div className="buy-bar">
        <div style={{flex:1}}><div className="buy-from">Desde</div><div className="buy-val">{fmt(minP)}</div></div>
        <button className="buy-btn" onClick={()=>setShowCO(true)}>Comprar entrada</button>
      </div>

    </div>
    {showCO&&<Checkout ev={ev} onClose={()=>setShowCO(false)}/>}
    </>
  );
}

function Home({onSelect}){
  const[solid,setSolid]=useState(false);
  const[showSearch,setShowSearch]=useState(false);
  const[showUser,setShowUser]=useState(false);
  const feat=EVENTS[0];
  const rest=EVENTS.slice(1);
  useEffect(()=>{
    const el=document.getElementById("scr");
    const fn=()=>setSolid((el?.scrollTop||0)>20);
    el?.addEventListener("scroll",fn);
    return()=>el?.removeEventListener("scroll",fn);
  },[]);
  return(
    <>
      <nav className={`nav${solid?" solid":""}`}>
        <div className="nav-logo">Fluxo</div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={()=>setShowSearch(true)}>🔍</button>
          <button className="nav-btn" onClick={()=>setShowUser(true)}>👤</button>
        </div>
      </nav>
      <div style={{padding:"68px 0 0",cursor:"pointer"}} onClick={()=>onSelect(feat)}>
        <div style={{position:"relative",height:380,overflow:"hidden"}}>
          <Art ev={feat}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(14,14,14,0) 30%,rgba(14,14,14,.9) 100%)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 20px 22px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.1)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.15)",padding:"4px 11px",borderRadius:100,fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:"#fff",display:"inline-block"}}/>
              {feat.tag}
            </div>
            <div style={{fontFamily:"var(--ff)",fontSize:32,fontWeight:900,lineHeight:.97,letterSpacing:"-.4px",marginBottom:10,textShadow:"0 2px 16px rgba(0,0,0,.5)"}}>{feat.artist}</div>
            <div style={{display:"flex",gap:10,fontSize:13,color:"rgba(255,255,255,.6)",flexWrap:"wrap"}}>
              <span>{feat.day} {feat.month}</span><span style={{color:"rgba(255,255,255,.3)"}}>·</span>
              <span>{feat.venue}</span><span style={{color:"rgba(255,255,255,.3)"}}>·</span>
              <span>Desde {fmt(Math.min(...feat.types.map(t=>t.price)))}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:"8px 0 80px"}}>
        <div style={{padding:"18px 20px 12px",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.3)"}}>Más eventos</div>
        {rest.map(ev=>{
          const minP=Math.min(...ev.types.map(t=>t.price));
          return(
            <div key={ev.id} onClick={()=>onSelect(ev)}
              style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,.06)",transition:"background .15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.03)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >
              <div style={{width:60,height:60,borderRadius:12,overflow:"hidden",flexShrink:0,background:`radial-gradient(circle at 60% 40%,${ev.c3}55,${ev.c2} 60%,${ev.c1})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{ev.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:3,fontWeight:500,letterSpacing:.5}}>{ev.tag}</div>
                <div style={{fontSize:16,fontWeight:800,marginBottom:3,letterSpacing:"-.2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ev.artist}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{ev.venue} · {ev.day} {ev.month}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginBottom:3}}>Desde</div>
                <div style={{fontSize:16,fontWeight:800}}>{fmt(minP)}</div>
              </div>
            </div>
          );
        })}
      </div>
      {showUser&&<UserModal onClose={()=>setShowUser(false)}/>}
      {showSearch&&<SearchOverlay onClose={()=>setShowSearch(false)} onSelect={ev=>{onSelect(ev);}}/>}
    </>
  );
}

export default function App(){
  const[page,setPage]=useState("home");
  const[ev,setEv]=useState(null);
  return(
    <>
      <style>{CSS}</style>
      <div id="scr" style={{background:"var(--bg)",minHeight:"100vh",maxWidth:430,margin:"0 auto",overflowY:"auto",height:"100dvh",position:"relative"}}>
        {page==="home"&&<Home onSelect={ev=>{setEv(ev);setPage("event");}}/>}
        {page==="event"&&ev&&<EventPage ev={ev} onBack={()=>{setEv(null);setPage("home");}}/>}
      </div>
    </>
  );
}
