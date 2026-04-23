"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ChevronRight, ChevronLeft, Paperclip } from "lucide-react";

// Steps: 0 = Landing, 1 = Greeting, 2 = Gallery, 3 = Wishes, 4 = Credits

// ─── Global Sound Utilities ────────────────────────────────────────────────
function playSound(url: string, volume = 0.4) {
  if (typeof window === 'undefined') return;
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch {}
}

export default function BirthdayApp() {
  const [step, setStep] = useState(0);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  // Start background music on first user gesture (browser policy)
  const startMusic = useCallback(() => {
    if (musicStarted) return;
    setMusicStarted(true);
    const music = new Audio("https://assets.mixkit.co/music/download/mixkit-romantic-and-cozy-421.mp3");
    music.loop = true;
    music.volume = 0.18;
    music.play().catch(() => {});
    bgMusicRef.current = music;
  }, [musicStarted]);

  // Stop music on unmount
  useEffect(() => {
    return () => { bgMusicRef.current?.pause(); };
  }, []);

  const nextStep = () => {
    playSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", 0.3);
    setStep((s) => s + 1);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-white text-pink-primary overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-pink-light selection:text-white"
      onClick={startMusic}
      style={{ touchAction: "manipulation" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-soft via-white to-white" />

      <AnimatePresence mode="wait">
        {step === 0 && <Landing key="landing" onNext={nextStep} />}
        {step === 1 && <Greeting key="greeting" onNext={nextStep} />}
        {step === 2 && <Gallery key="gallery" onNext={nextStep} />}
        {step === 3 && <Wishes key="wishes" onNext={nextStep} />}
        {step === 4 && <Credits key="credits" />}
      </AnimatePresence>
    </div>
  );
}

function Landing({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [petals, setPetals] = useState<{ x: number; size: number; duration: number; delay: number; drift: number }[]>([]);

  useEffect(() => {
    setPetals([...Array(18)].map(() => ({
      x: Math.random() * 100,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 120,
    })));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="z-10 relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #fff0f8 0%, #ffffff 45%, #fce7f3 100%)",
      }}
    >
      {/* === LAYERED BACKGROUND === */}
      {/* Soft mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-pink-300/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-rose-100/30 blur-[80px]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(#ff1493 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* === FLOATING ROSE PETALS (bottom-up) === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bottom-[-40px] rounded-full"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size * 1.4,
              background: `radial-gradient(ellipse at 40% 40%, #ffb6c1, #ff69b4)`,
              opacity: 0.55,
              borderRadius: "60% 40% 60% 40%",
            }}
            animate={{
              y: [0, "-110vh"],
              x: [0, p.drift],
              rotate: [0, 360],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* === HERO CONTENT === */}
      <div className="relative z-20 flex flex-col items-center w-full px-6">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 px-5 py-2 rounded-full border border-pink-200/60 bg-white/60 backdrop-blur-sm shadow-sm flex items-center gap-2"
        >
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Heart size={12} className="text-pink-primary fill-pink-primary" />
          </motion.span>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-pink-primary/60">
            A Message for You
          </span>
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>
            <Heart size={12} className="text-pink-primary fill-pink-primary" />
          </motion.span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-3"
        >
          <h1
            className="font-black tracking-tight leading-[1.1] px-4 break-words"
            style={{
              fontSize: "clamp(2.4rem, 12vw, 5rem)",
              background: "linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #e91e8c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isOpen ? "A Lifetime of\nHappiness..." : "A Special\nSurprise Awaits!"}
          </h1>
        </motion.div>

        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-pink-primary/40 font-bold tracking-[0.45em] uppercase text-[10px] mb-10"
          >
            Press the seal to begin
          </motion.p>
        )}

        {isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-pink-primary/40 font-bold tracking-[0.45em] uppercase text-[10px] mb-10"
          >
            Something beautiful is coming...
          </motion.p>
        )}

        {/* === ENVELOPE SCENE === */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          {/* Light beam behind envelope */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 pointer-events-none"
            style={{
              height: "260px",
              background: "linear-gradient(to bottom, rgba(255,20,147,0.18), transparent)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              filter: "blur(6px)",
            }}
          />

          {/* Glow ring behind envelope */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 -m-10 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,105,180,0.22) 0%, transparent 70%)",
            }}
          />

          {/* Envelope wrapper */}
          <motion.div
            className="relative w-72 md:w-80 h-48 cursor-pointer z-30 group"
            style={{ perspective: "1500px" }}
            onClick={() => !isOpen && setIsOpen(true)}
            whileHover={!isOpen ? { scale: 1.04, y: -4 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* ENVELOPE BACK WALL */}
            <div className="absolute inset-0 rounded-2xl shadow-[0_20px_60px_-10px_rgba(255,20,147,0.35)] overflow-hidden border border-pink-300/30"
              style={{ background: "linear-gradient(135deg, #f472b6, #ec4899, #db2777)" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] bg-[length:14px_14px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/10 to-white/10" />
            </div>

            {/* THE LETTER */}
            <motion.div
              className="absolute inset-x-4 bg-[#fffefc] rounded-xl p-6 flex flex-col items-center justify-start shadow-2xl border border-pink-50 z-10"
              style={{ height: "220px", bottom: "10px" }}
              initial={{ y: 220, opacity: 0 }}
              animate={isOpen ? { y: -190, opacity: 1, scale: 1.05, rotate: -1 } : { y: 220, opacity: 0 }}
              transition={{
                y: { delay: isOpen ? 0.6 : 0, type: "spring", stiffness: 65, damping: 13 },
                opacity: { delay: isOpen ? 0.6 : 0, duration: 0.3 },
                scale: { delay: isOpen ? 0.6 : 0 },
                rotate: { delay: isOpen ? 0.6 : 0 },
              }}
              whileHover={isOpen ? { scale: 1.08, rotate: 0, y: -200 } : {}}
              onClick={(e) => { if (isOpen) { e.stopPropagation(); onNext(); } }}
            >
              <div className="absolute top-3 right-3 w-9 h-11 bg-white/90 border-2 border-dashed border-pink-100 flex items-center justify-center rotate-12 shadow-sm">
                <Heart size={14} className="text-pink-primary fill-pink-primary opacity-25" />
              </div>
              <div className="text-center relative z-10 mt-2 h-full flex flex-col items-center">
                <p className="text-pink-primary font-black text-2xl italic font-serif tracking-tighter mb-3" style={{ lineHeight: 1.2 }}>
                  Hello,<br />Special One!
                </p>
                <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mb-3">
                  <Heart className="w-12 h-12 text-pink-primary fill-pink-primary drop-shadow-[0_8px_15px_rgba(255,20,147,0.2)]" />
                </motion.div>
                <div className="mt-auto bg-pink-50/60 px-4 py-1.5 rounded-full border border-pink-100/60 flex flex-col items-center">
                  <p className="text-[7px] text-pink-primary font-black tracking-[0.4em] uppercase opacity-40">Invitation</p>
                  <p className="text-[7px] text-pink-300 font-bold uppercase animate-pulse">Tap to Open</p>
                </div>
              </div>
            </motion.div>

            {/* ENVELOPE FRONT-SIDE FLAPS */}
            <div
              className="absolute inset-0 rounded-2xl z-[5] pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(160deg, #f472b6, #ec4899)",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.06)",
              }}
            />

            {/* ENVELOPE TOP FLAP */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[60%] origin-top z-30"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 30 }}
              transition={{ rotateX: { duration: 0.85, ease: [0.4, 0, 0.2, 1] } }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FLAP FRONT */}
              <div
                className="absolute inset-0 rounded-t-2xl flex items-end justify-center pb-6"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(160deg, #fb7bc9, #e879a8)",
                  boxShadow: "0 8px 30px rgba(219,39,119,0.3)",
                }}
              >
                {/* Seal */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.88 }}
                  className="relative z-50 transform translate-y-8 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center shadow-[0_8px_24px_rgba(220,38,38,0.5)] border-4 border-rose-800/40 cursor-pointer">
                    <Heart size={26} className="text-white fill-white" />
                  </div>
                  {!isOpen && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="absolute inset-0 rounded-full border-2 border-rose-400"
                    />
                  )}
                </motion.div>
              </div>

              {/* FLAP BACK */}
              <div
                className="absolute inset-0 bg-pink-100 rounded-t-2xl shadow-inner"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
              >
                <div className="w-full h-full opacity-10 bg-[radial-gradient(#db2777_1px,transparent_1px)] [background-size:12px_12px]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Pedestal shadow */}
          <motion.div
            animate={{ scaleX: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-56 h-5 rounded-full mt-4 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(255,20,147,0.25), transparent)" }}
          />
        </motion.div>

        {/* Bottom hint */}
        <motion.div
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="mt-10 z-20 flex flex-col items-center gap-3"
        >
          <p className="text-pink-primary font-black uppercase tracking-[0.45em] text-[9px]">
            {isOpen ? "Your adventure awaits..." : "Open the secret message"}
          </p>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-pink-300"
              />
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function Greeting({ onNext }: { onNext: () => void }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; scale: number; rotate: number }[]>([]);

  const handleOpenGift = () => {
    // Play whistle/party horn sound
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio playback failed:", e));

    // Haptic feedback for Android/Mobile
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    setIsOpened(true);
    
    setTimeout(() => {
      setShowCake(true);
      // Generate Confetti - slightly more particles for a "WOW" effect
      const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#ffffff", "#ffd700"];
      const particles = [...Array(60)].map((_, i) => ({
        id: i,
        x: Math.random() * 500 - 250,
        y: Math.random() * -450 - 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.8 + 0.4,
        rotate: Math.random() * 360
      }));
      setConfetti(particles);
    }, 400); // Snappier timing for mobile
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      className="z-10 flex flex-col items-center text-center px-6 max-w-lg w-full min-h-screen justify-center py-12 relative overflow-hidden"
    >
      {/* Background Particles Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -200],
              x: Math.sin(i) * 100,
            }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute text-pink-100"
            style={{ left: `${8 + i * 10}%`, top: '80%' }}
          >
            <Stars size={12 + i * 4} />
          </motion.div>
        ))}
      </div>

      {/* Confetti Explosion */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {confetti.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ 
                x: p.x, 
                y: p.y, 
                opacity: 0,
                scale: p.scale,
                rotate: p.rotate 
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 w-4 h-4 rounded-sm"
              style={{ backgroundColor: p.color, willChange: "transform, opacity" }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div animate={showCake ? { y: -20 } : { y: 0 }} className="space-y-3 mb-10 z-10 relative">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-primary to-pink-light tracking-tighter pb-2 drop-shadow-sm leading-[0.9]">
            HAPPY<br/>BIRTHDAY!
          </h1>
        </motion.div>
        <p className="text-xl md:text-2xl text-gray-700 font-bold bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50 shadow-sm mx-auto w-fit">
           {showCake ? "Surprise! Best Day Ever! 🥳" : "Something magical is waiting... ✨"}
        </p>
      </motion.div>

      {/* Main Interaction Container */}
      <div className="relative w-72 h-80 flex items-center justify-center mb-10 z-20">
        <AnimatePresence>
          {showCake && (
            <motion.div
              initial={{ scale: 0, y: 100, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              <div className="relative flex flex-col items-center" style={{ width: 230, height: 270 }}>
                {/* Cake Detail Upgrades */}
                <div className="w-7 h-7 bg-red-600 rounded-full shadow-[0_4px_10px_rgba(220,38,38,0.5)] relative z-50 mb-[-4px] border-b-2 border-red-800" />
                <div className="z-40 flex flex-col items-center mb-[-4px]">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.8, 1, 0.8],
                      boxShadow: ["0 0 10px #fbbf24", "0 0 25px #fbbf24", "0 0 10px #fbbf24"] 
                    }} 
                    transition={{ repeat: Infinity, duration: 0.8 }} 
                    className="w-5 h-8 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-white" 
                  />
                  <div className="w-3.5 h-12 bg-gradient-to-r from-pink-200 to-pink-300 rounded-t-sm shadow-inner" />
                </div>
                <div className="w-36 h-12 bg-white rounded-t-xl shadow-md border border-pink-50 relative z-30" />
                <div className="w-48 h-16 bg-pink-primary/10 rounded-xl shadow-lg border border-pink-100 relative z-20 mt-[-4px]" />
                <div className="w-60 h-20 bg-white rounded-xl shadow-2xl border border-pink-50 relative z-10 mt-[-4px] flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-pink-50/20" />
                   <p className="text-xs font-black text-pink-primary/20 tracking-[0.5em] uppercase">Celebration</p>
                </div>
                <div className="w-72 h-5 bg-gray-200 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] mt-3 border border-white" />
              </div>
              {/* Ground Glow */}
              <div className="absolute -bottom-10 w-64 h-12 bg-pink-primary/10 blur-3xl rounded-full -z-10" />
            </motion.div>
          )}
        </AnimatePresence>

        {!showCake && (
          <motion.div 
            onClick={!isOpened ? handleOpenGift : undefined} 
            className="relative w-60 h-60 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-12 bg-pink-primary/20 rounded-full blur-[60px] animate-pulse" />
            <motion.div 
               animate={isOpened ? { scale: [1, 1.05, 1], y: [0, 5, 0] } : {}}
               className="absolute bottom-0 w-full h-[72%] bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-2xl border-2 border-pink-700/50 flex justify-center"
               style={{ willChange: "transform" }}
            >
               <div className="w-10 h-full bg-pink-300/80 border-x-2 border-pink-400 shadow-inner" />
            </motion.div>
            <motion.div 
               animate={isOpened ? { 
                 y: -500, 
                 rotate: 75, 
                 x: 200, 
                 opacity: 0, 
                 scale: 1.2,
                 filter: "blur(4px)"
               } : { 
                 y: [0, -8, 0],
                 rotate: [0, -1, 1, 0]
               }}
               transition={{ 
                 duration: isOpened ? 0.8 : 3, 
                 ease: isOpened ? [0.22, 1, 0.36, 1] : "easeInOut",
                 repeat: isOpened ? 0 : Infinity
               }}
               className="absolute top-2 w-[112%] left-[-6%] h-[32%] bg-pink-500 rounded-xl shadow-2xl z-20 border-2 border-pink-600 flex justify-center"
               style={{ transformStyle: "preserve-3d", willChange: "transform, opacity, filter" }}
            >
               <div className="w-10 h-full bg-pink-300 border-x-2 border-pink-400" />
               <div className="absolute -top-12 flex -space-x-4">
                  <div className="w-14 h-14 bg-pink-300 rounded-full border-4 border-pink-400 rotate-45 shadow-lg" />
                  <div className="w-14 h-14 bg-pink-300 rounded-full border-4 border-pink-400 -rotate-45 shadow-lg" />
               </div>
            </motion.div>
            
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-pink-primary font-black uppercase text-[10px] tracking-widest bg-white/90 backdrop-blur-sm px-6 py-2.5 rounded-full border-2 border-pink-primary shadow-xl z-30 whitespace-nowrap">
               🎁 Tap to Reveal
            </motion.div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showCake && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(219,39,119,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-14 py-5 bg-gradient-to-r from-pink-primary to-pink-light text-white rounded-full font-black shadow-[0_15px_30px_rgba(219,39,119,0.4)] hover:brightness-110 transition-all cursor-pointer uppercase tracking-[0.2em] text-sm relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                See My Memories <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Gallery({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const images = [
    { src: "https://images.unsplash.com/photo-1582206684807-fcf870f2f359?q=80&w=800&auto=format&fit=crop", caption: "Our first adventure! 🐱✨" },
    { src: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=800&auto=format&fit=crop", caption: "Silly moments... 🤪💖" },
    { src: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop", caption: "Forever & Always 🌸💕" }
  ];

  const handleNext = () => setIndex((i) => (i + 1) % images.length);
  const handlePrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="z-10 flex flex-col items-center w-full max-w-sm px-6 relative"
    >
      {/* Floating Cute Elements — sides only, no ribbon here */}
      <motion.div animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-6 left-2 md:-left-4 text-4xl z-0" style={{ willChange: "transform" }}>🌸</motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-32 -left-2 md:-left-8 text-3xl z-0" style={{ willChange: "transform" }}>✨</motion.div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring" }} className="text-center mb-8 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-pink-200 border-dashed shadow-sm relative z-10">
        <h2 className="text-2xl md:text-3xl font-black text-pink-primary tracking-tight">Sweet Memories 🧸</h2>
      </motion.div>

      {/* Polaroid Frame */}
      <div className="relative w-full aspect-[3/4] bg-[#fffdf0] p-4 pb-20 rounded-xl shadow-[0_20px_50px_-10px_rgba(255,105,180,0.3)] border-4 border-white mb-10 flex flex-col items-center group transform transition-transform hover:rotate-1 z-10" style={{ willChange: "transform" }}>
        
        {/* 🎀 Ribbon — top-right corner of polaroid */}
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute -top-5 -right-5 text-4xl z-40 drop-shadow-md"
          style={{ willChange: "transform" }}
        >🎀</motion.div>

        {/* Washi Tape — top center */}
        <div className="absolute inset-x-0 -top-4 flex justify-center z-20">
           <div className="w-28 h-9 bg-pink-300/60 backdrop-blur-sm border border-white/50 shadow-sm transform -rotate-3" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)" }} />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.85, rotate: index % 2 === 0 ? -4 : 4 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            exit={{ opacity: 0, scale: 1.08, rotate: index % 2 === 0 ? 4 : -4 }} 
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="w-full h-full relative overflow-hidden rounded-lg shadow-inner bg-pink-50 border-2 border-pink-100"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={images[index].src}
              className="w-full h-full object-cover"
              alt="Gallery"
              loading="eager"
              style={{ transform: "translateZ(0)" }}
            />
            <div className="absolute inset-0 bg-pink-primary/10 pointer-events-none mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>
        
        {/* Playful Caption */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col items-center">
          <motion.p 
            key={`caption-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif italic font-bold text-pink-500 text-lg md:text-2xl text-center leading-tight drop-shadow-sm break-words max-w-[90%]"
          >
            {images[index].caption}
          </motion.p>
        </div>
        
        {/* Cute Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 -right-6 flex justify-between w-[calc(100%+3rem)] z-30">
          <motion.button 
            whileHover={{ scale: 1.2, rotate: -15 }} 
            whileTap={{ scale: 0.8 }} 
            onClick={handlePrev} 
            className="p-3.5 rounded-full bg-white shadow-[0_5px_15px_rgba(255,105,180,0.3)] text-pink-primary cursor-pointer border-2 border-pink-200 active:scale-95 transition-colors hover:bg-pink-50"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.2, rotate: 15 }} 
            whileTap={{ scale: 0.8 }} 
            onClick={handleNext} 
            className="p-3.5 rounded-full bg-white shadow-[0_5px_15px_rgba(255,105,180,0.3)] text-pink-primary cursor-pointer border-2 border-pink-200 active:scale-95 transition-colors hover:bg-pink-50"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </motion.button>
        </div>

        {/* Small decorations on polaroid */}
        <div className="absolute bottom-3 right-4 opacity-50 text-xl drop-shadow-sm">🐾</div>
        <div className="absolute top-4 left-4 opacity-40 text-lg drop-shadow-sm">✨</div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 15px 25px rgba(255,105,180,0.4)" }} 
        whileTap={{ scale: 0.95 }} 
        onClick={onNext} 
        className="relative z-20 px-10 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-black shadow-[0_10px_20px_rgba(255,105,180,0.3)] cursor-pointer uppercase tracking-[0.2em] text-[12px] w-full border-2 border-white flex items-center justify-center gap-2 overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">Next Surprise <Heart className="w-4 h-4 fill-white animate-pulse" /></span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
}

function Wishes({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    { 
      text: "Happy Birthday to an incredible soul! ✨\n\nMay this year bring you as much joy as you give to everyone around you. You deserve every bit of happiness and more. Keep shining!", 
      from: "David Adesta", 
      color: "bg-[#fffef0]", 
      rotation: -2, 
      icon: "🐱" 
    },
    { 
      text: "To the person who lights up every room! 🌟\n\nWatching you grow and achieve your dreams is an absolute privilege. Never stop being your authentic, wonderful self. You inspire me every single day!", 
      from: "David Adesta", 
      color: "bg-[#fff9fb]", 
      rotation: 3, 
      icon: "😺" 
    },
    { 
      text: "Wishing you a day filled with magic! 💖\n\nMay your journey be filled with beautiful moments, meaningful connections, and endless laughter. You have a heart of gold, never forget that.", 
      from: "David Adesta", 
      color: "bg-[#f0f9ff]", 
      rotation: -1, 
      icon: "😸" 
    },
    { 
      text: "Cheers to another year of greatness! 🎈\n\nYou're not just getting older, you're getting better. Here's to more adventures, more growth, and more reasons to celebrate. Happy Birthday!", 
      from: "David Adesta", 
      color: "bg-[#fdf2f8]", 
      rotation: 4, 
      icon: "😻" 
    },
    { 
      text: "Stay beautiful inside and out! 🥰\n\nYou are a true masterpiece in progress. I hope today is just the beginning of your best year yet. I'm always rooting for you. Love and light!", 
      from: "David Adesta", 
      color: "bg-[#f4fdfa]", 
      rotation: -3, 
      icon: "😽" 
    },
  ];

  const handleNextNote = () => { currentIndex < messages.length - 1 ? setCurrentIndex(currentIndex + 1) : onNext(); };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="z-10 flex flex-col items-center justify-center p-6 w-full h-full min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-pink-primary/5 -z-10" />
      
      <div className="relative w-full max-w-sm sm:max-w-md h-[34rem] flex items-center justify-center pt-10">
        <AnimatePresence>
          {messages.map((msg, index) => {
            if (index < currentIndex) return null;
            const isTop = index === currentIndex;
            const stackedOffset = index - currentIndex;
            
            return (
               <motion.div
                key={index}
                className={`absolute inset-0 rounded-[2rem] border border-pink-100 p-8 sm:p-12 flex flex-col items-center text-center cursor-pointer shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] ${msg.color} backdrop-blur-md`}
                style={{ 
                  transformOrigin: "center bottom",
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 100%)'
                }}
                animate={{ 
                  y: stackedOffset * 12, 
                  x: stackedOffset * 5, 
                  scale: 1 - stackedOffset * 0.05, 
                  rotate: isTop ? msg.rotation : msg.rotation + (stackedOffset * 2.5), 
                  zIndex: messages.length - index,
                  opacity: 1 - (stackedOffset * 0.15)
                }}
                exit={{ x: -1200, y: 150, rotate: -60, opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
                transition={{ type: "spring", stiffness: 85, damping: 22 }}
                onClick={isTop ? handleNextNote : undefined}
              >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')] rounded-[2rem]" />
                
                <Paperclip className="absolute -top-7 right-14 w-16 h-16 text-pink-primary/20 stroke-[2] drop-shadow-sm z-30" />
                
                {/* Animated Cat Emoji */}
                {isTop && (
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: [-8, 8, -8] }}
                    transition={{
                      scale: { type: "spring", stiffness: 250, delay: 0.3 },
                      rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }}
                    className="absolute -top-16 left-6 text-7xl md:text-9xl drop-shadow-2xl z-50 select-none"
                  >
                    {msg.icon}
                  </motion.div>
                )}
                
                <div className="flex-1 flex flex-col justify-center w-full mt-12 relative z-10 overflow-y-auto custom-scrollbar">
                  <p className="font-serif italic text-pink-primary/30 text-[10px] tracking-[0.4em] uppercase mb-10">Secret Wish</p>
                  <p className="font-black text-gray-800 text-xl sm:text-2xl md:text-3xl leading-[1.4] tracking-tight mb-8 whitespace-pre-wrap break-words px-2">
                    {msg.text}
                  </p>
                </div>
                
                <div className="w-full text-right mt-auto pt-6 border-t border-pink-100/50 mb-4 z-10">
                  <p className="font-serif italic text-pink-primary/60 text-2xl tracking-tighter">— {msg.from}</p>
                </div>

                {/* Cat Paws holding the letter - More integrated */}
                {isTop && (
                  <div className="absolute -bottom-8 inset-x-0 flex justify-between px-8 z-50 pointer-events-none">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="scale-90 md:scale-100"
                    >
                      <div className="w-16 h-20 bg-white border-2 border-pink-50 rounded-t-full shadow-lg relative flex flex-col items-center">
                        <div className="flex gap-1 mt-1.5 px-2">
                           {[1,2,3].map(i => <div key={i} className="w-3 h-4 bg-pink-100 rounded-full" />)}
                        </div>
                        <div className="absolute bottom-2 w-10 h-7 bg-pink-50 rounded-full opacity-60" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="scale-90 md:scale-100"
                    >
                      <div className="w-16 h-20 bg-white border-2 border-pink-50 rounded-t-full shadow-lg relative flex flex-col items-center">
                        <div className="flex gap-1 mt-1.5 px-2">
                           {[1,2,3].map(i => <div key={i} className="w-3 h-4 bg-pink-100 rounded-full" />)}
                        </div>
                        <div className="absolute bottom-2 w-10 h-7 bg-pink-50 rounded-full opacity-60" />
                      </div>
                    </motion.div>
                  </div>
                )}
                
                {isTop && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                  >
                    <p className="text-[10px] font-black text-pink-primary/30 uppercase tracking-[0.5em] animate-pulse">
                      Tap to continue
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Credits() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="z-10 flex flex-col items-center p-14 bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white max-w-xs w-full relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-100/50 rounded-full blur-3xl opacity-60" />
      
      <h2 className="text-[9px] font-black text-pink-primary mb-14 tracking-[0.5em] uppercase opacity-40">Digital Experience</h2>
      <div className="flex flex-col gap-12 text-center w-full z-10">
        <div>
          <p className="text-[8px] text-pink-primary/40 uppercase tracking-[0.3em] font-black mb-4">Art Direction</p>
          <p className="text-3xl font-serif italic text-black tracking-tighter">David Adesta</p>
        </div>
        <div className="w-8 h-[2px] bg-pink-primary/20 mx-auto" />
        <div>
          <p className="text-[8px] text-pink-primary/40 uppercase tracking-[0.3em] font-black mb-4">Production</p>
          <p className="text-xl font-black text-black tracking-tighter">Happy Moments Studio</p>
        </div>
      </div>
      <motion.div animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="mt-16"><Heart className="w-12 h-12 fill-pink-primary text-pink-primary drop-shadow-xl" /></motion.div>
      <p className="mt-12 text-[8px] font-black text-pink-primary/20 uppercase tracking-[0.3em]">Built for you with love</p>
    </motion.div>
  );
}
