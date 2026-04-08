import { useEffect, useState } from "react";

const C = {
  bg:"#EBF7F1", card:"#FFFFFF", primary:"#0B8B63", priLt:"#CBE9DC",
  priDk:"#065F42", danger:"#C62828", danLt:"#FDECEA", txt:"#132219",
  muted:"#587068", border:"#BDE0CE", success:"#178A4A",
  outer:"#C0DDD0", nav:"#FAFFFE", warn:"#D97706",
};

const T = {
  de:{
    appSub:"Ihr Gesundheitsplan", medName:"Pantoprazol 40 mg",
    medS:"Diese Tablette schützt Ihren Magen.",
    medN:"Pantoprazol verringert die Magensäure und hilft Ihrem Magen beim Heilen.",
    medM:"Pantoprazol ist ein Protonenpumpenhemmer. Es senkt die Magensäure und wird zur Behandlung einer Gastritis eingesetzt.",
    retry:"Bitte nehmen Sie jetzt die Tablette ein. Warten Sie danach 30 Minuten. Danach können Sie frühstücken.",
    retryLong:"Bitte nehmen Sie die Tablette zuerst ein. Warten Sie danach 30 Minuten. Erst dann sollten Sie frühstücken. So kann das Medikament gut wirken.",
    tlabel:"Wann einnehmen?",
    s1:"Tablette einnehmen", s2:"30 Minuten warten", s3:"Danach frühstücken",
    timelineSentence:"Nehmen Sie zuerst die Tablette ein. Warten Sie danach 30 Minuten. Dann frühstücken Sie.",
    understood:"Haben Sie alles verstanden?",
    yes:"Verstanden", no:"Nochmal erklären",
    rtitle:"Was Sie meiden sollen", rdur:"2 Wochen lang",
    why:"Warum? Tippen Sie hier.",
    c1:"Kein Kaffee",        c1w:"Kaffee reizt Ihren Magen und kann Ihre Beschwerden verstärken.",
    c2:"Kein Alkohol",       c2w:"Alkohol kann Ihre Magenschleimhaut schädigen und die Heilung stören.",
    c3:"Kein scharfes Essen",c3w:"Scharfes Essen kann Ihren Magen reizen und die Entzündung verschlimmern.",
    rulesSentence:"Bitte meiden Sie Kaffee, Alkohol und scharfes Essen. Diese Dinge können Ihren Magen reizen.",
    stitle:"Einstellungen", slang:"Sprache wählen", slevel:"Sprachniveau",
    ssimple:"Einfach", sstd:"Normal", smed:"Medizinisch",
    stts:"Vorlesen (Audio)", sfont:"Schriftgröße",
    nm:"Medizin", nr:"Regeln", ns:"Einstellungen",
    hear:"Tippen zum Anhören",
    arNote:"Arabische Stimme benötigt ein installiertes Sprachpaket.",
    arNoteDetail:"Windows: Einstellungen → Zeit & Sprache → Sprache → Arabisch hinzufügen. iOS/Android: funktioniert automatisch.",
  },
  en:{
    appSub:"Your health plan", medName:"Pantoprazole 40 mg",
    medS:"This tablet protects your stomach.",
    medN:"Pantoprazole reduces stomach acid and helps your stomach heal.",
    medM:"Pantoprazole is a proton pump inhibitor. It reduces stomach acid and is used to treat gastritis.",
    retry:"Please take the tablet now. Then wait 30 minutes. After that, you can have breakfast.",
    retryLong:"Please take the tablet first. Then wait 30 minutes. Only after that should you have breakfast. This helps the medicine work properly.",
    tlabel:"When to take it",
    s1:"Take the tablet", s2:"Wait 30 minutes", s3:"Then have breakfast",
    timelineSentence:"First take the tablet. Then wait 30 minutes. After that, have breakfast.",
    understood:"Did you understand everything?",
    yes:"Understood", no:"Explain again",
    rtitle:"What to avoid", rdur:"For 2 weeks",
    why:"Why? Tap here.",
    c1:"No coffee",     c1w:"Coffee irritates your stomach and can make your symptoms worse.",
    c2:"No alcohol",    c2w:"Alcohol can damage your stomach lining and slow healing.",
    c3:"No spicy food", c3w:"Spicy food can irritate your stomach and make the inflammation worse.",
    rulesSentence:"Please avoid coffee, alcohol, and spicy food. These things can irritate your stomach.",
    stitle:"Settings", slang:"Choose language", slevel:"Language level",
    ssimple:"Simple", sstd:"Standard", smed:"Medical",
    stts:"Read aloud", sfont:"Text size",
    nm:"Medicine", nr:"Rules", ns:"Settings",
    hear:"Tap to listen",
    arNote:"Arabic voice requires a language pack.",
    arNoteDetail:"Windows: Settings → Time & Language → Language → Add Arabic. iOS/Android: works automatically.",
  },
  ar:{
    appSub:"خطتك الصحية", medName:"بانتوبرازول 40 mg",
    medS:"هذه الحبة تحمي معدتك.",
    medN:"بانتوبرازول يقلل حمض المعدة ويساعد معدتك على الشفاء.",
    medM:"بانتوبرازول هو دواء يقلل حمض المعدة ويُستخدم لعلاج التهاب المعدة.",
    retry:"يرجى تناول الحبة الآن. ثم انتظري ثلاثين دقيقة. بعد ذلك يمكنك تناول الفطور.",
    retryLong:"يرجى تناول الحبة أولاً. ثم انتظري ثلاثين دقيقة. وبعد ذلك فقط تناولي الفطور. هكذا يعمل الدواء بشكل أفضل.",
    tlabel:"متى تأخذين الدواء؟",
    s1:"خذي الحبة", s2:"انتظري 30 دقيقة", s3:"ثم تناولي الفطور",
    timelineSentence:"خذي الحبة أولاً. ثم انتظري ثلاثين دقيقة. بعد ذلك تناولي الفطور.",
    understood:"هل فهمت كل شيء؟",
    yes:"فهمت", no:"اشرح مجددًا",
    rtitle:"ما يجب تجنبه", rdur:"لمدة أسبوعين",
    why:"لماذا؟ اضغطي هنا.",
    c1:"بدون قهوة",     c1w:"القهوة قد تهيّج معدتك وتزيد من الأعراض.",
    c2:"بدون كحول",     c2w:"الكحول قد يضر بطانة المعدة ويبطئ الشفاء.",
    c3:"بدون طعام حار", c3w:"الطعام الحار قد يهيّج المعدة ويزيد الالتهاب.",
    rulesSentence:"يرجى تجنب القهوة والكحول والطعام الحار. هذه الأشياء قد تهيّج المعدة.",
    stitle:"الإعدادات", slang:"اختر اللغة", slevel:"مستوى اللغة",
    ssimple:"بسيط", sstd:"عادي", smed:"طبي",
    stts:"القراءة بصوت", sfont:"حجم الخط",
    nm:"الدواء", nr:"القواعد", ns:"الإعدادات",
    hear:"اضغط للاستماع",
    arNote:"الصوت العربي يحتاج إلى حزمة لغة مثبتة.",
    arNoteDetail:"ويندوز: الإعدادات ← الوقت واللغة ← اللغة ← إضافة العربية. iOS/Android: يعمل تلقائياً.",
  },
};

// ── TTS ───────────────────────────────────────────────────────────────────────
let _voices = [];
function primeVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const load = () => { _voices = window.speechSynthesis.getVoices(); };
  load();
  window.speechSynthesis.onvoiceschanged = load;
}
function pickVoice(lang) {
  const all = _voices.length ? _voices : (window.speechSynthesis?.getVoices() || []);
  const patterns = {
    de:["de-DE","de-AT","de-CH","de-"],
    en:["en-US","en-GB","en-AU","en-"],
    ar:["ar-SA","ar-EG","ar-AE","ar-MA","ar-KW","ar-"],
  };
  for (const pat of (patterns[lang]||["de-"])) {
    const v = all.find(v => pat.endsWith("-")
      ? v.lang.toLowerCase().startsWith(pat.toLowerCase())
      : v.lang.toLowerCase() === pat.toLowerCase());
    if (v) return v;
  }
  if (lang==="ar") return all.find(v=>/arab/i.test(v.name)||/^ar/i.test(v.lang))||null;
  return null;
}
function doSay(text, lang, enabled) {
  if (!enabled||typeof window==="undefined"||!window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const bcp47={de:"de-DE",en:"en-US",ar:"ar-SA"};
  const speak = () => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang  = bcp47[lang]||"de-DE";
    u.rate  = lang==="ar" ? 0.82 : 0.9;
    u.pitch = 1;
    const v = pickVoice(lang);
    if (v) { u.voice=v; u.lang=v.lang; }
    synth.speak(u);
  };
  if (_voices.length) { setTimeout(speak,60); }
  else {
    const prev = synth.onvoiceschanged;
    synth.onvoiceschanged = () => { _voices=synth.getVoices(); if(prev)prev(); setTimeout(speak,60); };
    synth.getVoices();
  }
}

// ── INLINE SVG FLAGS ──────────────────────────────────────────────────────────
function FlagDE({w=38,h=26}) {
  return (
    <svg width={w} height={h} viewBox="0 0 38 26" style={{borderRadius:4,display:"block",flexShrink:0}}>
      <rect width="38" height="8.67" y="0"     fill="#000000"/>
      <rect width="38" height="8.67" y="8.66"  fill="#DD0000"/>
      <rect width="38" height="8.67" y="17.33" fill="#FFCE00"/>
    </svg>
  );
}
function FlagGB({w=38,h=26}) {
  return (
    <svg width={w} height={h} viewBox="0 0 38 26" style={{borderRadius:4,display:"block",flexShrink:0}}>
      <rect width="38" height="26" fill="#012169"/>
      {/* white diagonals */}
      <line x1="0" y1="0"  x2="38" y2="26" stroke="white" strokeWidth="5.2"/>
      <line x1="38" y1="0" x2="0"  y2="26" stroke="white" strokeWidth="5.2"/>
      {/* red diagonals */}
      <line x1="0" y1="0"  x2="38" y2="26" stroke="#C8102E" strokeWidth="2.8"/>
      <line x1="38" y1="0" x2="0"  y2="26" stroke="#C8102E" strokeWidth="2.8"/>
      {/* white cross */}
      <rect x="15.5" y="0"  width="7"  height="26" fill="white"/>
      <rect x="0"    y="9.5" width="38" height="7"  fill="white"/>
      {/* red cross */}
      <rect x="16.5" y="0"  width="5"  height="26" fill="#C8102E"/>
      <rect x="0"    y="10.5" width="38" height="5" fill="#C8102E"/>
    </svg>
  );
}
function FlagSA({ w = 38, h = 26 }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 38 26"
      style={{ borderRadius: 4, display: "block", flexShrink: 0 }}
    >
      <rect width="38" height="26" rx="4" fill="#006C35" />
      <rect x="1" y="1" width="36" height="24" rx="3" fill="#006C35" stroke="rgba(255,255,255,0.25)" />
      <text
        x="19"
        y="17"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        direction="rtl"
      >
        عربي
      </text>
    </svg>
  );
}

const FlagComponents = { de: FlagDE, en: FlagGB, ar: FlagSA };

// ── PRIMITIVES ─────────────────────────────────────────────────────────────────
function SoundBtn({text, lang, tts, sz=46}) {
  const [lit,setLit] = useState(false);
  if (!tts) return null;
  return (
    <button
      onClick={e=>{e.stopPropagation();doSay(text,lang,true);setLit(true);setTimeout(()=>setLit(false),2800);}}
      aria-label="Vorlesen"
      style={{
        width:sz,height:sz,borderRadius:"50%",border:"none",cursor:"pointer",flexShrink:0,
        background:lit?C.primary:C.priLt, color:lit?"#fff":C.primary,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:sz*0.43, transition:"all .18s",
        boxShadow:lit?"0 3px 12px rgba(11,139,99,.4)":"none",
      }}
    >{lit?"🔊":"🔉"}</button>
  );
}

function Toggle({on,set}) {
  return (
    <button onClick={()=>set(!on)} style={{
      width:52,height:28,borderRadius:14,border:"none",cursor:"pointer",flexShrink:0,
      background:on?C.primary:"#C5C5C5",position:"relative",transition:"background .2s",
    }}>
      <div style={{
        width:22,height:22,borderRadius:"50%",background:"#fff",
        position:"absolute",top:3,left:on?27:3,
        transition:"left .2s",boxShadow:"0 1px 5px rgba(0,0,0,.22)",
      }}/>
    </button>
  );
}

function ForbidIcon({emoji}) {
  return (
    <div style={{position:"relative",width:72,height:72,flexShrink:0}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:C.danLt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{emoji}</div>
      <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`3.5px solid ${C.danger}`}}/>
      <div style={{position:"absolute",top:"50%",left:"10%",width:"80%",height:3.5,background:C.danger,borderRadius:2,transform:"translateY(-50%) rotate(-45deg)"}}/>
    </div>
  );
}

function PackArt() {
  return (
    <svg viewBox="0 0 240 145" width="100%" style={{maxWidth:210,display:"block",margin:"0 auto"}}>
      <defs>
        <linearGradient id="boxg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1255A8"/><stop offset="100%" stopColor="#1976D2"/>
        </linearGradient>
      </defs>
      <rect x="5" y="4" width="230" height="137" rx="12" fill="url(#boxg)"/>
      <rect x="5" y="4" width="230" height="137" rx="12" fill="white" opacity="0.06"/>
      <circle cx="52" cy="48" r="30" fill="white" opacity="0.16"/>
      <circle cx="52" cy="48" r="20" fill="white" opacity="0.14"/>
      <text x="52" y="56" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif">+</text>
      <rect x="96" y="14" width="132" height="66" rx="7" fill="white" opacity="0.94"/>
      <rect x="104" y="23" width="112" height="14" rx="4" fill="#1255A8" opacity="0.85"/>
      <rect x="104" y="44" width="80"  height="9"  rx="3" fill="#1255A8" opacity="0.55"/>
      <rect x="104" y="59" width="58"  height="8"  rx="3" fill="#1255A8" opacity="0.3"/>
      <rect x="12" y="96" width="216" height="38" rx="7" fill="white" opacity="0.11"/>
      {[0,1,2,3,4,5,6].map(i=>(
        <ellipse key={i} cx={23+i*31} cy="115" rx="12" ry="8.5" fill="#64B5F6" opacity="0.92"/>
      ))}
      <rect x="152" y="82" width="72" height="22" rx="11" fill="#27AE60"/>
      <rect x="160" y="88" width="56" height="10" rx="4" fill="white" opacity="0.9"/>
    </svg>
  );
}

// ── ACTION BUTTONS ─────────────────────────────────────────────────────────────
// Question + TTS above, two compact icon-only buttons ✔ (green) / ✖ (red).
// ✔ → navigates silently   ✖ → shows retry + plays audio
function ActionBtns({onYes, onNo, t, lang, tts, fs}) {
  return (
    <div style={{marginBottom:14,marginTop:4}}>
      {/* Question row */}
      <div style={{
        display:"flex",alignItems:"center",gap:10,
        marginBottom:10,padding:"12px 14px",
        background:C.card,borderRadius:14,border:`1px solid ${C.border}`,
        boxShadow:"0 2px 8px rgba(0,55,30,.06)",
      }}>
        <span style={{flex:1,fontSize:16*fs,fontWeight:700,color:C.txt,textAlign:"center"}}>
          {t.understood}
        </span>
        <SoundBtn text={t.understood} lang={lang} tts={tts} sz={40}/>
      </div>

      {/* Compact ✔ / ✖ buttons */}
      <div style={{display:"flex",gap:12}}>
        <button
          onClick={onYes}
          aria-label={t.yes}
          style={{
            flex:1,height:58,borderRadius:18,border:"none",cursor:"pointer",
            background:C.success,color:"#fff",fontSize:30,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 4px 16px rgba(23,138,74,.38)",
            transition:"transform .12s,box-shadow .12s",
          }}
          onPointerDown={e=>{e.currentTarget.style.transform="scale(.93)";}}
          onPointerUp={e=>{e.currentTarget.style.transform="scale(1)";}}
        >✔</button>
        <button
          onClick={onNo}
          aria-label={t.no}
          style={{
            flex:1,height:58,borderRadius:18,border:"none",cursor:"pointer",
            background:C.danger,color:"#fff",fontSize:30,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 4px 16px rgba(198,40,40,.32)",
            transition:"transform .12s,box-shadow .12s",
          }}
          onPointerDown={e=>{e.currentTarget.style.transform="scale(.93)";}}
          onPointerUp={e=>{e.currentTarget.style.transform="scale(1)";}}
        >✖</button>
      </div>
    </div>
  );
}

function MedScreen({t,lang,tts,fs,cplx,card,onDone}) {
  const [showRetryBox,setShowRetryBox]=useState(false);
  const desc = cplx==="s" ? t.medS : cplx==="n" ? t.medN : t.medM;
  const displayText = desc;

  return (
    <div style={{padding:"14px 14px 0"}}>
      <div style={{...card,textAlign:"center",background:"linear-gradient(135deg,#E5F1FF,#E1F5EC)",paddingBottom:12}}>
        <PackArt/>
        <div style={{fontWeight:800,fontSize:19*fs,marginTop:8,color:C.primary}}>{t.medName}</div>
      </div>

      <div style={card}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{flex:1,fontSize:17*fs,lineHeight:1.65,fontWeight:400,color:C.txt}}>
            {displayText}
          </div>
          <SoundBtn text={displayText} lang={lang} tts={tts} sz={48}/>
        </div>
      </div>

      <div style={card}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:14*fs,color:C.txt}}>{t.tlabel}</div>
          <SoundBtn text={t.timelineSentence} lang={lang} tts={tts} sz={38}/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
          {[{e:"💊",l:t.s1},{arrow:true},{e:"⏰",l:t.s2},{arrow:true},{e:"🍳",l:t.s3}].map((x,i)=>
            x.arrow
              ? <div key={i} style={{fontSize:22,color:C.muted,flexShrink:0}}>›</div>
              : <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                  <div style={{width:62,height:62,borderRadius:16,background:C.priLt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:"0 2px 8px rgba(0,80,50,.1)"}}>{x.e}</div>
                  <div style={{fontSize:12*fs,fontWeight:700,color:C.muted,textAlign:"center",maxWidth:82}}>{x.l}</div>
                </div>
          )}
        </div>
      </div>

      <ActionBtns
        onYes={onDone}
        onNo={() => {
          setShowRetryBox(true);
          doSay(t.retryLong || t.retry, lang, tts);
        }}
        t={t}
        lang={lang}
        tts={tts}
        fs={fs}
      />

      {showRetryBox && (
        <div
          style={{
            background: "#FFF8E1",
            border: "1.5px solid #F9A825",
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            color: C.txt,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 15 * fs, marginBottom: 8 }}>
            {t.tlabel}
          </div>
          <div style={{ fontSize: 15 * fs, lineHeight: 1.65 }}>
            {t.retryLong || t.retry}
          </div>
        </div>
      )}
    </div>
  );
}

// ── RULES SCREEN ───────────────────────────────────────────────────────────────
function RulesScreen({t,lang,tts,fs,card,onDone}) {
  const [open,setOpen]=useState(null);
  const [showSummary,setShowSummary]=useState(false);
  const rules=[{id:"c",e:"☕",l:t.c1,w:t.c1w},{id:"a",e:"🍺",l:t.c2,w:t.c2w},{id:"s",e:"🌶️",l:t.c3,w:t.c3w}];
  return (
    <div style={{padding:"14px 14px 0"}}>
      <div style={{...card,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontWeight:800,fontSize:19*fs}}>{t.rtitle}</div>
          <div style={{display:"flex",alignItems:"center",gap:7,marginTop:6,color:C.warn}}>
            <span style={{fontSize:20}}>📅</span>
            <span style={{fontWeight:700,fontSize:15*fs}}>{t.rdur}</span>
          </div>
        </div>
        <SoundBtn text={`${t.rtitle}. ${t.rdur}.`} lang={lang} tts={tts} sz={48}/>
      </div>
      {rules.map(r=>(
        <div key={r.id} style={{marginBottom:10}}>
          <button onClick={()=>{const next=open===r.id?null:r.id;setOpen(next);if(next===r.id)doSay(`${r.l}. ${r.w}`,lang,tts);}}
            style={{width:"100%",display:"flex",alignItems:"center",gap:14,padding:"14px",borderRadius:open===r.id?"14px 14px 0 0":14,border:`2px solid ${open===r.id?C.danger:C.border}`,background:open===r.id?C.danLt:C.card,cursor:"pointer",transition:"all .2s",textAlign:"start"}}>
            <ForbidIcon emoji={r.e}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:17*fs,color:C.danger}}>{r.l}</div>
              <div style={{fontSize:12*fs,color:C.muted,marginTop:4}}>{open===r.id?"▲":"▼"} {t.why}</div>
            </div>
            <SoundBtn text={`${r.l}. ${r.w}`} lang={lang} tts={tts} sz={40}/>
          </button>
          {open===r.id&&<div style={{background:C.danLt,border:`2px solid ${C.danger}`,borderTop:"none",borderRadius:"0 0 14px 14px",padding:"14px 16px",fontSize:15*fs,lineHeight:1.65,color:C.txt,fontWeight:500}}>{r.w}</div>}
        </div>
      ))}
           <ActionBtns
        onYes={onDone}
        onNo={() => {
          setShowSummary(true);
          doSay(t.rulesSentence, lang, tts);
        }}
        t={t}
        lang={lang}
        tts={tts}
        fs={fs}
      />

      {showSummary && (
        <div
          style={{
            background: "#FFF8E1",
            border: "1.5px solid #F9A825",
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            color: C.txt,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 15 * fs, marginBottom: 8 }}>
            {t.rtitle}
          </div>
          <div style={{ fontSize: 15 * fs, lineHeight: 1.65 }}>
            {t.rulesSentence}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SETTINGS SCREEN ────────────────────────────────────────────────────────────
function SettingsScreen({lang,setLang,cplx,setCplx,tts,setTts,fs,setFs,t,card}) {
  const langs=[
    {c:"de",name:"Deutsch"},
    {c:"en",name:"English"},
    {c:"ar",name:"العربية"},
  ];
  const rowCard={...card,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12};
  const [showArInfo,setShowArInfo]=useState(false);

  return (
    <div style={{padding:"14px 14px 0"}}>
      <div style={{fontWeight:800,fontSize:20,marginBottom:14,color:C.txt}}>{t.stitle}</div>

      {/* Language selector with SVG flags */}
      <div style={card}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:12,color:C.txt}}>{t.slang}</div>
        <div style={{display:"flex",gap:8}}>
          {langs.map(l=>{
            const Flag = FlagComponents[l.c];
            const active = lang===l.c;
            return (
              <button key={l.c} onClick={()=>{setLang(l.c);if(l.c==="ar")setShowArInfo(true);else setShowArInfo(false);}}
                style={{flex:1,padding:"12px 6px",borderRadius:14,cursor:"pointer",border:`2.5px solid ${active?C.primary:C.border}`,background:active?C.priLt:"#fff",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"all .18s",boxShadow:active?"0 3px 10px rgba(11,139,99,.2)":"none"}}>
                <Flag w={42} h={28}/>
                <span style={{fontSize:12,fontWeight:active?800:500,color:active?C.primary:C.muted,textAlign:"center"}}>{l.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Arabic TTS info box */}
      {lang==="ar"&&(
        <div style={{marginBottom:12,padding:"12px 14px",borderRadius:14,background:"#FFF8E1",border:"1.5px solid #F9A825"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
            <span style={{fontSize:22,flexShrink:0}}>ℹ️</span>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:"#7B5800",marginBottom:4}}>{t.arNote}</div>
              <div style={{fontSize:12,color:"#7B5800",lineHeight:1.6}}>{t.arNoteDetail}</div>
            </div>
          </div>
        </div>
      )}

  {/* Complexity */}
<div style={card}>
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  }}>
    <div style={{ fontWeight: 700, fontSize: 15, color: C.txt }}>
      {t.slevel}
    </div>

    <SoundBtn text={t.slevel} lang={lang} tts={tts} sz={36} />
  </div>

  <div style={{ display: "flex", gap: 6 }}>
    {[
      ["s", t.ssimple, "🙂"],
      ["n", t.sstd, "👨‍⚕️"],
      ["m", t.smed, "🔬"],
    ].map(([k, label, icon]) => (
      <div
        key={k}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <button
          onClick={() => setCplx(k)}
          style={{
            width: "100%",
            padding: "10px 4px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            background: cplx === k ? C.primary : "#F0F4F2",
            color: cplx === k ? "#fff" : C.muted,
            fontWeight: cplx === k ? 800 : 400,
            fontSize: 13,
            transition: "all .18s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            minHeight: 72,
          }}
        >
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ textAlign: "center" }}>{label}</span>
        </button>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <SoundBtn text={label} lang={lang} tts={tts} sz={34} />
        </div>
      </div>
    ))}
  </div>
</div>

      {/* TTS toggle */}
      <div style={rowCard}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>🔊</span>
          <span style={{fontWeight:700,fontSize:15,color:C.txt}}>{t.stts}</span>
        </div>
        <Toggle on={tts} set={setTts}/>
      </div>

      {/* Font slider */}
      <div style={{...card,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:24}}>🔤</span>
            <span style={{fontWeight:700,fontSize:15,color:C.txt}}>{t.sfont}</span>
          </div>
          <span style={{fontWeight:800,color:C.primary,fontSize:15}}>{Math.round(fs*100)}%</span>
        </div>
        <input type="range" min="0.85" max="1.4" step="0.05" value={fs}
          onChange={e=>setFs(parseFloat(e.target.value))}
          style={{width:"100%",accentColor:C.primary,height:6}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6,color:C.muted}}>
          <span style={{fontSize:12}}>A</span><span style={{fontSize:22,fontWeight:700}}>A</span>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,setLang]=useState("de");
  const [scr,setScr]  =useState("med");
  const [cplx,setCplx]=useState("s");
  const [tts,setTts]  =useState(true);
  const [fs,setFs]    =useState(1);

  useEffect(()=>{primeVoices();},[]);

  const t   = T[lang]||T.de;
  const dir = lang==="ar"?"rtl":"ltr";

  const card={background:C.card,borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 12px rgba(0,55,30,.07)",border:`1px solid ${C.border}`};
  const nav=[{id:"med",icon:"💊",label:t.nm},{id:"rules",icon:"🚫",label:t.nr},{id:"settings",icon:"⚙️",label:t.ns}];
  const onConfirm={med:()=>setScr("rules"),rules:()=>setScr("med")};

  const HeaderFlag = FlagComponents[lang]||FlagDE;

  return (
    <div style={{background:C.outer,minHeight:"100vh",display:"flex",alignItems:"flex-start",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:400,minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",color:C.txt,direction:dir,fontSize:16*fs}}>

        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${C.priDk} 0%,${C.primary} 100%)`,padding:"15px 16px 13px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 14px rgba(0,70,40,.28)",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{width:42,height:42,background:"rgba(255,255,255,.2)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:23,border:"1.5px solid rgba(255,255,255,.3)"}}>💊</div>
            <div>
              <div style={{color:"#fff",fontWeight:800,fontSize:19*fs,letterSpacing:".4px"}}>ICC_M2E</div>
              <div style={{color:"rgba(255,255,255,.7)",fontSize:11*fs}}>{t.appSub}</div>
            </div>
          </div>

          {/* Flag badge → settings */}
          <button
            onClick={()=>setScr("settings")}
            aria-label={t.slang}
            style={{background:"rgba(255,255,255,.18)",borderRadius:24,padding:"5px 12px 5px 8px",border:"1.5px solid rgba(255,255,255,.32)",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background .15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.3)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.18)"}
          >
            <HeaderFlag w={34} h={23}/>
            <span style={{color:"#fff",fontWeight:700,fontSize:13*fs}}>{lang.toUpperCase()}</span>
            <span style={{color:"rgba(255,255,255,.7)",fontSize:11}}>⚙</span>
          </button>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto"}}>
          {scr==="med"   && <MedScreen   key={`med-${lang}-${cplx}`}   t={t} lang={lang} tts={tts} fs={fs} cplx={cplx} card={card} onDone={onConfirm.med}/>}
          {scr==="rules" && <RulesScreen key={`rules-${lang}`}          t={t} lang={lang} tts={tts} fs={fs}             card={card} onDone={onConfirm.rules}/>}
          {scr==="settings"&&<SettingsScreen lang={lang} setLang={setLang} cplx={cplx} setCplx={setCplx} tts={tts} setTts={setTts} fs={fs} setFs={setFs} t={t} card={card}/>}
        </div>

        {/* Bottom nav */}
        <div style={{background:C.nav,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-around",padding:"8px 0 14px",flexShrink:0,boxShadow:"0 -3px 12px rgba(0,55,30,.07)"}}>
          {nav.map(n=>{
            const active=scr===n.id;
            return (
              <button key={n.id} onClick={()=>setScr(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"4px 0",color:active?C.primary:C.muted,transition:"color .15s"}}>
                <div style={{width:50,height:46,borderRadius:14,background:active?C.priLt:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:25,transition:"background .18s"}}>{n.icon}</div>
                <span style={{fontSize:11*fs,fontWeight:active?800:400}}>{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}