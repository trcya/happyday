"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ChevronRight, ChevronLeft, Paperclip, Key, Gift, Unlock } from "lucide-react";

// Steps: 0 = Landing, 1 = Greeting, 2 = Gallery, 3 = Wishes, 4 = Credits, 5 = Surprise

// ─── Global Sound Utilities ────────────────────────────────────────────────
function playSound(url: string, volume = 0.4) {
  if (typeof window === 'undefined') return;
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch {}
}

function KeyPiece({ id, size = 24, className = "", isInventory = false }: { id: number, size?: number, className?: string, isInventory?: boolean }) {
  // Fragments of a key
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={isInventory ? "2" : "3"} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      initial={isInventory ? {} : { rotate: 0 }}
      animate={isInventory ? {} : { rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      {id === 1 && <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5.5V17" />} {/* Left Top */}
      {id === 2 && <path d="M12 2c4 0 7 3 7 7 0 2-1 4-3 5.5V17" />} {/* Right Top */}
      {id === 3 && <path d="M9 17h6v2H9zM12 17v4" />} {/* Stem/Middle */}
      {id === 4 && <path d="M10 21h4v2h-4zM12 21v2" />} {/* Teeth/End */}
    </motion.svg>
  );
}

export default function BirthdayApp() {
  const [step, setStep] = useState(0);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [collectedPieces, setCollectedPieces] = useState<number[]>([]);
  const [showFinalGift, setShowFinalGift] = useState(false);
  const [keyReconstructed, setKeyReconstructed] = useState(false);

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

  const prevStep = () => {
    playSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", 0.2);
    setStep((s) => Math.max(0, s - 1));
  };

  const collectPiece = (id: number) => {
    if (collectedPieces.includes(id)) return;
    playSound("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3", 0.4);
    setCollectedPieces(prev => [...prev, id]);
    
    if (collectedPieces.length + 1 === 4) {
      setTimeout(() => {
        setKeyReconstructed(true);
      }, 1000);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center selection:bg-pink-200 selection:text-pink-700"
      onClick={startMusic}
      style={{ touchAction: "manipulation", background: "linear-gradient(160deg, #fff0f8 0%, #ffffff 50%, #fce4ec 100%)", fontFamily: "var(--font-nunito, 'Nunito', sans-serif)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, #fce4ec 0%, #ffffff 60%, #fff0f8 100%)", opacity: 0.35 }} />

      <AnimatePresence mode="wait">
        {step === 0 && <Landing key="landing" onNext={nextStep} onCollect={() => collectPiece(1)} collected={collectedPieces.includes(1)} />}
        {step === 1 && <Greeting key="greeting" onNext={nextStep} onPrev={prevStep} onCollect={() => collectPiece(2)} collected={collectedPieces.includes(2)} />}
        {step === 2 && <Gallery key="gallery" onNext={nextStep} onPrev={prevStep} onCollect={() => collectPiece(3)} collected={collectedPieces.includes(3)} />}
        {step === 3 && <Wishes key="wishes" onNext={nextStep} onPrev={prevStep} onCollect={() => collectPiece(4)} collected={collectedPieces.includes(4)} />}
        {step === 4 && <Credits key="credits" onNext={nextStep} onPrev={prevStep} keyReady={keyReconstructed} />}
        {step === 5 && <SurpriseFinale key="surprise" onPrev={prevStep} keyReady={keyReconstructed} />}
      </AnimatePresence>

      <KeyInventory collectedCount={collectedPieces.length} total={4} reconstructed={keyReconstructed} />
    </div>
  );
}

function Landing({ onNext, onCollect, collected }: { onNext: () => void; onCollect: () => void; collected: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [petals, setPetals] = useState<{ x: number; size: number; duration: number; delay: number; drift: number }[]>([]);

  useEffect(() => {
    setPetals([...Array(8)].map(() => ({
      x: Math.random() * 100,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 5 + 9,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 80,
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
        background: "linear-gradient(160deg, #fff5fb 0%, #ffffff 45%, #fce4ec 100%)",
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
              background: `radial-gradient(ellipse at 40% 40%, #ffc1d4, #f48fb1)`,
              opacity: 0.5,
              borderRadius: "60% 40% 60% 40%",
              willChange: "transform",
              transform: "translateZ(0)"
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
              fontSize: "clamp(2.2rem, 11vw, 4.5rem)",
              background: "linear-gradient(135deg, #e91e8c 0%, #f06292 50%, #f48fb1 100%)",
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
            <div className="absolute inset-0 rounded-2xl shadow-[0_16px_40px_-8px_rgba(240,98,146,0.4)] overflow-hidden border border-pink-200/50"
              style={{ background: "linear-gradient(135deg, #f8bbd9, #f06292, #e91e8c)" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] bg-[length:16px_16px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-800/10 to-white/20" />
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
                background: "linear-gradient(160deg, #f8bbd9, #f06292)",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.04)",
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
                  background: "linear-gradient(160deg, #fbbdd9, #f06292)",
                  boxShadow: "0 6px 20px rgba(240,98,146,0.3)",
                }}
              >
                {/* Seal */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.88 }}
                  className="relative z-50 transform translate-y-8 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-[0_8px_24px_rgba(240,98,146,0.55)] border-4 border-pink-700/30 cursor-pointer">
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

        {/* Hidden Key Piece 1 */}
        {!collected && (
          <motion.div
            className="absolute bottom-16 left-16 z-50 cursor-pointer p-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.7, 1, 0.7], 
              scale: [1, 1.4, 1],
            }}
            whileHover={{ scale: 1.6, filter: "drop-shadow(0 0 25px #f06292)" }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={(e) => { e.stopPropagation(); onCollect(); }}
          >
            <KeyPiece id={1} size={36} className="text-pink-400" />
            <div className="absolute inset-0 bg-pink-300/40 blur-2xl rounded-full -z-10 animate-pulse" />
            <motion.div 
              className="absolute inset-0 border-2 border-pink-200 rounded-full -z-20"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Greeting({ onNext, onPrev, onCollect, collected }: { onNext: () => void; onPrev: () => void; onCollect: () => void; collected: boolean }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [isCandleOut, setIsCandleOut] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; scale: number; rotate: number }[]>([]);
  const [balloons, setBalloons] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);

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
      
      // Generate Balloons
      const balloonColors = ["#f06292", "#f48fb1", "#ba68c8", "#4fc3f7", "#ffd54f", "#ff8a65"];
      setBalloons([...Array(15)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        delay: Math.random() * 2,
        size: Math.random() * 20 + 30
      })));

      // 35 particles — enough wow, gentle on Android GPU
      const colors = ["#f48fb1", "#f06292", "#fce4ec", "#ffb6c1", "#ffffff", "#f8bbd9"];
      const particles = [...Array(35)].map((_, i) => ({
        id: i,
        x: Math.random() * 400 - 200,
        y: Math.random() * -380 - 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.7 + 0.3,
        rotate: Math.random() * 360
      }));
      setConfetti(particles);
    }, 350);
  };

  const handleBlowCandle = () => {
    if (isCandleOut) return;
    setIsCandleOut(true);
    playSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", 0.3);
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(30);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      className="z-10 flex flex-col items-center text-center px-6 max-w-lg w-full min-h-screen justify-center py-12 relative overflow-hidden"
    >
      {/* Balloons: Optimized for Android */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: "120vh", x: `${b.x}vw`, opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 8,
              delay: b.delay,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute"
            style={{ 
              willChange: "transform",
              transform: "translateZ(0)"
            }}
          >
            <div 
              style={{ 
                width: b.size, 
                height: b.size * 1.2, 
                backgroundColor: b.color,
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.1), 0 5px 15px ${b.color}44`,
                position: "relative"
              }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0.5 h-12 bg-white/40" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Particles Layer — reduced for Android */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0, 0.25, 0],
              y: [0, -160],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.7 }}
            className="absolute text-pink-200"
            style={{ left: `${10 + i * 13}%`, top: '78%', transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <Stars size={10 + i * 3} />
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
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: p.color, willChange: "transform, opacity", transform: "translateZ(0)" }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div animate={showCake ? { y: -20 } : { y: 0 }} className="space-y-3 mb-10 z-10 relative">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text tracking-tighter pb-2 drop-shadow-sm leading-[0.9]" style={{ backgroundImage: "linear-gradient(160deg, #e91e8c, #f06292, #f48fb1)" }}>
            HAPPY<br/>BIRTHDAY!
          </h1>
        </motion.div>
        <p className="text-xl md:text-2xl text-gray-700 font-bold bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50 shadow-sm mx-auto w-fit">
           {showCake ? (isCandleOut ? "Make a wish! 💖✨" : "Tap the candle to blow it! 🎂") : "Something magical is waiting... ✨"}
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
              <div className="relative flex flex-col items-center" style={{ width: 230, height: 280 }}>
                {/* Candle */}
                <div 
                  className="z-40 flex flex-col items-center mb-[-2px] cursor-pointer"
                  onClick={handleBlowCandle}
                >
                  <AnimatePresence>
                    {!isCandleOut && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ repeat: Infinity, duration: 0.75 }}
                        className="w-4 h-7 rounded-full"
                        style={{ background: "linear-gradient(to top, #f97316, #facc15, #fff)" }}
                      />
                    )}
                  </AnimatePresence>
                  {isCandleOut && (
                    <motion.div 
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 0.5, 0], y: -20 }}
                      className="w-3 h-5 bg-gray-400 rounded-full blur-sm"
                    />
                  )}
                  <div className="w-3 h-10" style={{ background: "linear-gradient(to bottom, #f9a8d4, #f472b6)", borderRadius: "3px 3px 0 0" }} />
                </div>

                {/* Top tier */}
                <div className="w-32 h-11 relative z-30 flex items-center justify-center rounded-t-2xl overflow-hidden" style={{ background: "#fff0f8", border: "2px solid #f9a8d4" }}>
                  <div className="absolute inset-x-0 top-0 h-3" style={{ background: "linear-gradient(90deg, #f9a8d4, #f472b6, #f9a8d4)", borderRadius: "0.75rem 0.75rem 50% 50% / 0 0 100% 100%" }} />
                  <p className="text-[11px] font-black tracking-widest" style={{ color: "#e91e8c", marginTop: 10 }}>🎂 YAY!</p>
                </div>

                {/* Middle tier */}
                <div className="w-44 h-14 relative z-20 mt-[-2px] flex items-center justify-center overflow-hidden" style={{ background: "#fce4ec", border: "2px solid #f9a8d4" }}>
                  <div className="absolute inset-x-0 top-0 h-3" style={{ background: "linear-gradient(90deg, #f48fb1, #f06292, #f48fb1)", borderRadius: "0 0 50% 50% / 0 0 60% 60%" }} />
                  <p className="text-sm font-black tracking-wide" style={{ color: "#c2185b", marginTop: 6 }}>Happy Birthday!</p>
                </div>

                {/* Bottom tier */}
                <div className="w-56 h-16 relative z-10 mt-[-2px] flex items-center justify-center overflow-hidden rounded-b-2xl" style={{ background: "#fff5fb", border: "2px solid #f9a8d4" }}>
                  <div className="absolute inset-x-0 top-0 h-3" style={{ background: "linear-gradient(90deg, #f06292, #e91e8c, #f06292)" }} />
                  <p className="text-base font-black" style={{ color: "#e91e8c", letterSpacing: "0.15em", marginTop: 8 }}>🌸 Celebration 🌸</p>
                </div>

                {/* Plate */}
                <div className="w-64 h-4 mt-1 rounded-full" style={{ background: "linear-gradient(to bottom, #fce4ec, #f9a8d4)", boxShadow: "0 6px 20px rgba(240,98,146,0.2)" }} />
              </div>
              {/* Ground Glow */}
              <div className="absolute -bottom-8 w-56 h-10 rounded-full -z-10" style={{ background: "rgba(240,98,146,0.12)", filter: "blur(20px)" }} />
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
            
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-black uppercase text-[10px] tracking-widest px-6 py-2.5 rounded-full shadow-xl z-30 whitespace-nowrap border-2" style={{ color: "#e91e8c", background: "rgba(255,255,255,0.95)", borderColor: "#f9a8d4" }}>
               🎁 Tap to Reveal
            </motion.div>
          </motion.div>
        )}

        {/* Hidden Key Piece 2 */}
        {!collected && showCake && (
          <motion.div
            className="absolute -bottom-10 -right-16 z-50 cursor-pointer p-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.4, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            whileHover={{ scale: 1.6, filter: "drop-shadow(0_0_25px_#f06292)" }}
            onClick={(e) => { e.stopPropagation(); onCollect(); }}
          >
            <KeyPiece id={2} size={36} className="text-pink-400" />
            <div className="absolute inset-0 bg-pink-200/40 blur-2xl rounded-full -z-10 animate-pulse" />
            <motion.div 
              className="absolute inset-0 border-2 border-pink-200 rounded-full -z-20"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showCake && isCandleOut && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="z-50 flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-14 py-5 rounded-full font-black cursor-pointer uppercase tracking-[0.2em] text-sm relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #e91e8c, #f06292)",
                color: "#ffffff",
                boxShadow: "0 15px 30px rgba(233,30,140,0.35)"
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                See My Memories <ChevronRight />
              </span>
            </motion.button>

            <button 
              onClick={onPrev}
              className="text-pink-400 font-bold uppercase text-[10px] tracking-widest hover:text-pink-600 transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Gallery({ onNext, onPrev, onCollect, collected }: { onNext: () => void; onPrev: () => void; onCollect: () => void; collected: boolean }) {
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

        {/* Hidden Key Piece 3 */}
        {!collected && (
          <motion.div
            className="absolute -top-4 -right-12 z-50 cursor-pointer p-6"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.4, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            whileHover={{ scale: 1.6, filter: "drop-shadow(0_0_25px_#f06292)" }}
            onClick={(e) => { e.stopPropagation(); onCollect(); }}
          >
            <KeyPiece id={3} size={36} className="text-pink-400" />
            <div className="absolute inset-0 bg-pink-200/40 blur-2xl rounded-full -z-10 animate-pulse" />
            <motion.div 
              className="absolute inset-0 border-2 border-pink-200 rounded-full -z-20"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="relative z-20 px-10 py-4 rounded-full font-black cursor-pointer uppercase tracking-[0.2em] text-[12px] w-full flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg, #f06292, #e91e8c)",
          color: "#ffffff",
          boxShadow: "0 10px 24px rgba(233,30,140,0.3)",
          border: "2px solid rgba(255,255,255,0.4)"
        }}
      >
        <span className="flex items-center gap-2">Next Surprise <Heart className="w-4 h-4" style={{ fill: "white" }} /></span>
      </motion.button>

      <button 
        onClick={onPrev}
        className="mt-6 text-pink-400 font-bold uppercase text-[10px] tracking-widest hover:text-pink-600 transition-colors z-20"
      >
        ← Back
      </button>
    </motion.div>
  );
}

function Wishes({ onNext, onPrev, onCollect, collected }: { onNext: () => void; onPrev: () => void; onCollect: () => void; collected: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    { 
      text: "Happy Birthday to an incredible soul! ✨\n\nMay this year bring you as much joy as you give to everyone around you. You deserve every bit of happiness and more. Keep shining!", 
      from: "David Adesta", 
      color: "bg-[#fff0f8]", 
      rotation: -2, 
      icon: "🐱" 
    },
    { 
      text: "To the person who lights up every room! 🌸\n\nWatching you grow and achieve your dreams is an absolute privilege. Never stop being your authentic, wonderful self. You inspire me every single day!", 
      from: "David Adesta", 
      color: "bg-[#fff5fb]", 
      rotation: 3, 
      icon: "😺" 
    },
    { 
      text: "Wishing you a day filled with magic! 💖\n\nMay your journey be filled with beautiful moments, meaningful connections, and endless laughter. You have a heart of gold, never forget that.", 
      from: "David Adesta", 
      color: "bg-[#fce4ec]", 
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
      color: "bg-[#fff8fc]", 
      rotation: -3, 
      icon: "😽" 
    },
  ];

  const handleNextNote = () => { currentIndex < messages.length - 1 ? setCurrentIndex(currentIndex + 1) : onNext(); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="z-10 flex flex-col items-center justify-center w-full min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff5fb 0%, #ffffff 50%, #fce4ec 100%)" }}
    >
      {/* Soft bg blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #fce4ec, transparent)", opacity: 0.5, filter: "blur(50px)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #fce4ec, transparent)", opacity: 0.4, filter: "blur(50px)" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center mb-4 mt-8 px-6 z-10"
      >
        <p className="text-[10px] font-black tracking-[0.45em] uppercase mb-1" style={{ color: "#f06292", opacity: 0.5 }}>Sweet Notes</p>
        <h2 className="text-2xl font-black" style={{ color: "#e91e8c" }}>For You 💌</h2>
        {/* Progress dots */}
        <div className="flex gap-2 mt-3">
          {messages.map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i === currentIndex ? 1.3 : 1, opacity: i <= currentIndex ? 1 : 0.3 }}
              className="h-1.5 rounded-full"
              style={{ width: i === currentIndex ? 20 : 6, background: "#f06292", transition: "all 0.3s" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Note stack */}
      <div className="relative w-full max-w-[340px] mx-auto px-4 flex items-center justify-center" style={{ height: "420px" }}>
        <AnimatePresence>
          {messages.map((msg, index) => {
            if (index < currentIndex || index > currentIndex + 2) return null;
            const isTop = index === currentIndex;
            const stackedOffset = index - currentIndex;

            return (
              <motion.div
                key={index}
                className={`absolute inset-0 rounded-3xl cursor-pointer border ${msg.color}`}
                style={{
                  transformOrigin: "center bottom",
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                  borderColor: "#f9a8d4",
                  boxShadow: isTop ? "0 16px 40px -8px rgba(240,98,146,0.25)" : "0 8px 20px -4px rgba(240,98,146,0.1)"
                }}
                animate={{
                  y: stackedOffset * 10,
                  x: stackedOffset * 4,
                  scale: 1 - stackedOffset * 0.04,
                  rotate: isTop ? msg.rotation : msg.rotation + stackedOffset * 2,
                  zIndex: messages.length - index,
                  opacity: 1 - stackedOffset * 0.18
                }}
                exit={{ x: -500, y: 80, rotate: -35, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                onClick={isTop ? handleNextNote : undefined}
              >
                {/* Note content */}
                <div className="flex flex-col h-full pt-10 pb-10 px-6">
                  {/* Label */}
                  <p className="text-[9px] font-black tracking-[0.4em] uppercase mb-3" style={{ color: "#f06292", opacity: 0.5 }}>✨ Secret Wish ✨</p>

                  {/* Message text */}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap break-words" style={{ color: "#4a4a5a", lineHeight: 1.65 }}>
                      {msg.text}
                    </p>
                  </div>

                  {/* Divider + from */}
                  <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px dashed #f9a8d4" }}>
                    <div className="flex gap-1">
                      {["💕","🌸","✨"].map((e, i) => <span key={i} className="text-xs">{e}</span>)}
                    </div>
                    <p className="text-sm font-black italic" style={{ color: "#e91e8c" }}>— {msg.from}</p>
                  </div>
                </div>

                {/* Top accent: Washi Tape style */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 opacity-80 z-20" 
                  style={{ 
                    background: "rgba(249, 168, 212, 0.4)", 
                    backdropFilter: "blur(4px)",
                    transform: "rotate(-2deg) translateY(-50%)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    borderRadius: "2px"
                  }} 
                />

                {/* Paperclip: Better alignment */}
                <div className="absolute -top-4 right-8 z-30" style={{ transform: "rotate(15deg) translateZ(0)", willChange: "transform" }}>
                  <Paperclip className="w-9 h-9" style={{ color: "#f06292", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }} />
                </div>

                {/* Cat emoji: Neater placement */}
                {isTop && (
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0, rotate: [-5, 5, -5] }}
                    transition={{
                      scale: { type: "spring", stiffness: 300, delay: 0.2 },
                      rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    className="absolute -top-12 left-6 text-5xl z-40 select-none"
                    style={{ willChange: "transform", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))", transform: "translateZ(0)" }}
                  >
                    {msg.icon}
                  </motion.div>
                )}

                {/* Cat paws at the bottom: Smoother for Android */}
                {isTop && (
                  <div className="absolute -bottom-8 inset-x-0 flex justify-between px-10 z-50 pointer-events-none">
                    <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}>
                      <div className="w-12 h-14 rounded-t-full flex flex-col items-center pt-1 gap-0.5" style={{ background: "#fff5fb", border: "2px solid #f9a8d4", boxShadow: "0 4px 10px rgba(240,98,146,0.15)" }}>
                        <div className="flex gap-0.5">
                          {[0,1,2].map(i => <div key={i} className="w-2 h-3 rounded-full" style={{ background: "#fce4ec" }} />)}
                        </div>
                        <div className="w-6 h-4 rounded-full mt-0.5" style={{ background: "#fce4ec" }} />
                      </div>
                    </motion.div>
                    <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}>
                      <div className="w-12 h-14 rounded-t-full flex flex-col items-center pt-1 gap-0.5" style={{ background: "#fff5fb", border: "2px solid #f9a8d4", boxShadow: "0 4px 10px rgba(240,98,146,0.15)" }}>
                        <div className="flex gap-0.5">
                          {[0,1,2].map(i => <div key={i} className="w-2 h-3 rounded-full" style={{ background: "#fce4ec" }} />)}
                        </div>
                        <div className="w-6 h-4 rounded-full mt-0.5" style={{ background: "#fce4ec" }} />
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Hidden Key Piece 4 - Only on the 3rd note */}
                {!collected && index === 2 && (
                   <motion.div
                    className="absolute -top-12 -right-12 z-[100] cursor-pointer p-10"
                    animate={{ 
                      opacity: [0.9, 1, 0.9],
                      scale: [1, 1.8, 1],
                      filter: ["drop-shadow(0 0 10px #f06292)", "drop-shadow(0 0 40px #f06292)", "drop-shadow(0 0 10px #f06292)"]
                    }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    whileHover={{ scale: 2 }}
                    onClick={(e) => { e.stopPropagation(); onCollect(); }}
                  >
                    <KeyPiece id={4} size={48} className="text-pink-500" />
                    <div className="absolute inset-0 bg-pink-400/60 blur-[40px] rounded-full -z-10 animate-pulse" />
                    <motion.div 
                      className="absolute inset-0 border-4 border-pink-400 rounded-full -z-20"
                      animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <motion.div 
                      className="absolute inset-0 border-2 border-pink-200 rounded-full -z-20"
                      animate={{ scale: [1, 4], opacity: [0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Tap hint: Moved lower and made cleaner */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-12 flex flex-col items-center gap-3 z-10 pb-6"
      >
        <div className="px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-pink-100">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: "#f06292", opacity: 0.7 }}>
            {currentIndex < messages.length - 1 ? "Tap card to continue" : "Tap for final surprise 🎁"}
          </p>
        </div>
        <div className="flex gap-2">
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ scale: [1,1.5,1], opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: i*0.25 }} className="w-2 h-2 rounded-full" style={{ background: "#f48fb1" }} />
          ))}
        </div>
      </motion.div>

      <button 
        onClick={onPrev}
        className="mb-8 text-pink-400 font-bold uppercase text-[10px] tracking-widest hover:text-pink-600 transition-colors z-10"
      >
        ← Back
      </button>
    </motion.div>
  );
}

function Credits({ onNext, onPrev, keyReady }: { onNext: () => void; onPrev: () => void; keyReady: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 50 }}
      className="z-10 flex flex-col items-center p-12 rounded-[3rem] border border-pink-100 max-w-xs w-full relative overflow-hidden mx-6"
      style={{ background: "linear-gradient(160deg, #fff5fb 0%, #ffffff 60%, #fce4ec 100%)", boxShadow: "0 30px 80px -15px rgba(240,98,146,0.2)" }}
    >
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full" style={{ background: "radial-gradient(circle, #fce4ec, transparent)", opacity: 0.7 }} />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full" style={{ background: "radial-gradient(circle, #fce4ec, transparent)", opacity: 0.5 }} />

      <div className="text-4xl mb-6">🎀</div>
      <h2 className="text-[9px] font-black mb-12 tracking-[0.5em] uppercase" style={{ color: "#f06292", opacity: 0.5 }}>Made with Love</h2>
      <div className="flex flex-col gap-10 text-center w-full z-10">
        <div>
          <p className="text-[8px] uppercase tracking-[0.3em] font-black mb-3" style={{ color: "#f06292", opacity: 0.45 }}>From</p>
          <p className="text-3xl font-black" style={{ color: "#e91e8c" }}>David Adesta</p>
        </div>
        <div className="w-8 h-[2px] mx-auto rounded-full" style={{ background: "#f48fb1" }} />
        <div>
          <p className="text-[8px] uppercase tracking-[0.3em] font-black mb-3" style={{ color: "#f06292", opacity: 0.45 }}>Studio</p>
          <p className="text-lg font-black" style={{ color: "#c2185b" }}>Happy Moments 🌸</p>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, -6, 0], scale: [1, 1.12, 1] }} 
        transition={{ repeat: Infinity, duration: 2.8 }} 
        className="mt-14 mb-8"
      >
        <Heart className="w-12 h-12 drop-shadow-xl" style={{ fill: "#f06292", color: "#f06292" }} />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] bg-pink-500 text-white shadow-lg flex items-center gap-2"
      >
        {keyReady ? "Buka Kejutan Akhir ✨" : "Selesai ✨"}
      </motion.button>

      <button 
        onClick={onPrev}
        className="mt-4 text-pink-400 font-bold uppercase text-[10px] tracking-widest hover:text-pink-600 transition-colors"
      >
        ← Back
      </button>

      <p className="mt-8 text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: "#f48fb1", opacity: 0.5 }}>Built for you with love 💕</p>
    </motion.div>
  );
}

// ─── Easter Egg Components ──────────────────────────────────────────────────

function SurpriseFinale({ keyReady, onPrev }: { keyReady: boolean; onPrev: () => void }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="z-10 flex flex-col items-center justify-center text-center px-6 min-h-[60vh]"
    >
      <motion.div
        animate={keyReady ? { 
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        } : { 
          rotate: [0, -1, 1, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: keyReady ? 3 : 4, 
          ease: "easeInOut" 
        }}
        className="mb-16 cursor-pointer relative group"
        onClick={() => setShowModal(true)}
      >
        {/* Magic Halo */}
        <div className="absolute inset-0 bg-pink-200/40 blur-[60px] rounded-full scale-150 animate-pulse" />
        
        {/* Treasure Chest Icon (Pink Theme) */}
        <div className="relative w-40 h-32">
           {/* Floating Sparkles */}
           {keyReady && [...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute text-pink-300 pointer-events-none"
               animate={{ 
                 y: [0, -60], 
                 x: [0, (i % 2 === 0 ? 30 : -30)], 
                 opacity: [0, 1, 0],
                 scale: [0, 1, 0]
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 2 + i * 0.5, 
                 delay: i * 0.3 
               }}
               style={{ top: '20%', left: '45%' }}
             >
               <Stars size={12 + i * 2} fill="currentColor" />
             </motion.div>
           ))}

           {/* Lid */}
           <motion.div 
             className="absolute -top-6 inset-x-0 h-14 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-2xl border-b-4 border-pink-600 z-20 shadow-lg origin-bottom"
             animate={keyReady ? { rotateX: [0, -10, 0] } : {}}
             transition={{ repeat: Infinity, duration: 2 }}
           >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] bg-[length:12px_12px]" />
              
              {/* Lock Mechanism */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-white to-pink-100 rounded-full border-4 border-pink-400 shadow-xl flex items-center justify-center z-30">
                 <Key size={18} className="text-pink-600" />
                 {keyReady && (
                   <motion.div 
                     className="absolute inset-0 bg-pink-200 rounded-full -z-10 blur-md"
                     animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                   />
                 )}
              </div>
           </motion.div>

           {/* Body */}
           <div className="absolute inset-0 bg-gradient-to-b from-pink-400 to-pink-600 rounded-b-xl border-4 border-pink-600 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] opacity-10 bg-[length:12px_12px]" />
              <div className="absolute inset-y-0 left-6 w-3 bg-white/20" />
              <div className="absolute inset-y-0 right-6 w-3 bg-white/20" />
           </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-4xl font-black text-pink-700 mb-4 tracking-tight">
          {keyReady ? "Harta Karun Hati ✨" : "Masih Terkunci... 🔒"}
        </h2>
        <p className="text-pink-600/80 font-bold max-w-sm mb-10 text-lg leading-relaxed">
          {keyReady 
            ? "Peti indah ini menunggumu. Gunakan kepingan kunci pink-mu untuk melihat isinya!" 
            : "Ayo cari semua kepingan kuncinya untuk membuka kejutan spesial ini."}
        </p>

        {keyReady ? (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(233, 30, 140, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="group px-12 py-5 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-black uppercase tracking-[0.2em] shadow-2xl border-2 border-pink-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Buka Hadiah <Unlock size={20} className="animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
        ) : (
          <div className="inline-flex flex-col items-center gap-4">
             <div className="h-2 w-48 bg-pink-50 rounded-full overflow-hidden border border-pink-100">
                <motion.div 
                  className="h-full bg-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: "0%" }}
                />
             </div>
             <p className="text-pink-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Terus Mencari Kepingan Kunci
             </p>
          </div>
        )}

        <button 
          onClick={onPrev}
          className="mt-12 text-pink-400 font-bold uppercase text-[10px] tracking-widest hover:text-pink-600 transition-colors"
        >
          ← Back
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <FinalGiftModal onClose={() => setShowModal(false)} canUnlock={keyReady} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function KeyInventory({ collectedCount, total, reconstructed }: { collectedCount: number; total: number; reconstructed: boolean }) {
  return (
    <div className="fixed top-6 left-6 z-[100] flex flex-col gap-2">
      <motion.div 
        className="bg-white/70 backdrop-blur-md border border-pink-200 p-3 rounded-2xl shadow-lg flex items-center gap-3"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="relative">
          <Key className={`w-5 h-5 ${reconstructed ? "text-pink-500" : "text-pink-200"}`} />
          {reconstructed && (
            <motion.div 
              className="absolute inset-0 bg-pink-400 rounded-full blur-md -z-10"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[8px] font-black uppercase tracking-widest text-pink-400">Key Fragments</p>
          <div className="flex gap-1.5 mt-1.5">
            {[1, 2, 3, 4].map((id) => (
              <div 
                key={id} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-700 ${id <= collectedCount ? "bg-pink-100 border-pink-300 border shadow-inner" : "bg-pink-50/50 border-pink-100 border"}`}
              >
                <KeyPiece 
                  id={id} 
                  size={16} 
                  isInventory 
                  className={id <= collectedCount ? "text-pink-500" : "text-pink-200 opacity-50"} 
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {reconstructed && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-black text-pink-500 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-200 shadow-sm self-start"
        >
          Key Reconstructed! Find the gift 🎁
        </motion.p>
      )}
    </div>
  );
}

function FinalGiftModal({ onClose, canUnlock }: { onClose: () => void; canUnlock: boolean }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  const handleUnlock = () => {
    if (!canUnlock) return;
    
    // Play sequence sounds
    playSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", 0.5); // Insert key
    
    setTimeout(() => {
      playSound("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3", 0.7); // Open chest
      setIsUnlocked(true);
      
      // Generate pink/white particles
      setParticles([...Array(25)].map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 350,
        y: -100 - Math.random() * 250,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5
      })));

      setTimeout(() => setShowContent(true), 1500);
    }, 600);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-pink-900/30 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-[3.5rem] p-12 max-w-xl w-full shadow-[0_50px_100px_-20px_rgba(233,30,140,0.2)] relative overflow-hidden flex flex-col items-center text-center border-2 border-pink-50"
        initial={{ scale: 0.8, y: 100, rotateX: 20 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.8, y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-pink-300 hover:text-pink-500 transition-colors z-50 p-2 hover:bg-pink-50 rounded-full"
        >
          <Stars size={24} />
        </button>

        {!showContent ? (
          <>
            <div className="mb-6">
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[11px] font-black uppercase tracking-[0.5em] text-pink-400 mb-3"
              >
                Magical Surprise ✨
              </motion.p>
              <h2 className="text-4xl font-black text-pink-600 leading-tight">
                {isUnlocked ? "Terbuka! 🌸" : "Buka Sekarang!"}
              </h2>
            </div>

            {/* ═══ REALISTIC CHEST SCENE ═══ */}
            <div
              className="relative flex items-end justify-center mb-10"
              style={{ width: 280, height: 240, perspective: "900px", perspectiveOrigin: "50% 70%" }}
            >
              {/* ── Light Rays (shoot upward when open) ── */}
              {isUnlocked && (
                <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center" style={{ top: '20%' }}>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.6, delay: 0.3 + i * 0.07, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
                      className="absolute origin-bottom"
                      style={{
                        width: 6,
                        height: 120 + i * 10,
                        background: `linear-gradient(to top, rgba(255,182,213,0.9), transparent)`,
                        transform: `rotate(${-70 + i * 20}deg)`,
                        bottom: 0,
                        borderRadius: 4,
                        filter: "blur(2px)",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ── Floating Hearts & Stars out of chest ── */}
              {isUnlocked && particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], x: p.x * 0.7, y: p.y }}
                  transition={{ duration: 2.5, delay: 0.4 + p.delay, ease: "easeOut" }}
                  className="absolute z-50 pointer-events-none"
                  style={{ bottom: '40%', left: '50%' }}
                >
                  {p.id % 3 === 0
                    ? <Heart size={p.size + 4} className="text-pink-400 fill-pink-300 drop-shadow-[0_0_6px_#f9a8d4]" />
                    : p.id % 3 === 1
                    ? <Stars size={p.size + 4} className="text-white fill-white drop-shadow-[0_0_6px_#fff]" />
                    : <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: 'radial-gradient(circle, #fbcfe8, #f472b6)', boxShadow: '0 0 8px #f9a8d4' }} />
                  }
                </motion.div>
              ))}

              {/* ── CHEST BODY + LID (3D) ── */}
              <div className="relative" style={{ width: 220, height: 160, transformStyle: "preserve-3d" }}>

                {/* Inner glow inside chest (visible when open) */}
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                    className="absolute z-10 rounded-xl overflow-hidden pointer-events-none"
                    style={{ bottom: 0, left: 6, right: 6, height: 120 }}
                  >
                    <div className="w-full h-full" style={{
                      background: "radial-gradient(ellipse at 50% 80%, #fff 0%, #fce7f3 40%, transparent 80%)",
                      filter: "blur(4px)"
                    }} />
                  </motion.div>
                )}

                {/* ── LID ── */}
                <motion.div
                  className="absolute left-0 right-0 z-20"
                  style={{
                    bottom: 100,  // sits on top of body
                    height: 90,
                    transformOrigin: "bottom center",
                    transformStyle: "preserve-3d",
                  }}
                  animate={isUnlocked ? {
                    rotateX: -148,
                    translateY: -10,
                  } : {
                    rotateX: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 55,
                    damping: 10,
                    delay: isUnlocked ? 0.3 : 0,
                  }}
                >
                  {/* Lid top face */}
                  <div
                    className="absolute inset-0 rounded-t-2xl"
                    style={{
                      background: "linear-gradient(170deg, #fbcfe8 0%, #f9a8d4 40%, #ec4899 100%)",
                      boxShadow: "0 -6px 20px rgba(236,72,153,0.3)",
                      border: "3px solid #db2777",
                      borderBottom: "none",
                    }}
                  >
                    {/* Lid highlights */}
                    <div className="absolute inset-x-4 top-2 h-3 rounded-full opacity-40" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
                    {/* Lid straps */}
                    <div className="absolute top-0 bottom-0 left-10 w-3 rounded" style={{ background: "rgba(219,39,119,0.3)" }} />
                    <div className="absolute top-0 bottom-0 right-10 w-3 rounded" style={{ background: "rgba(219,39,119,0.3)" }} />
                  </div>

                  {/* Lock badge */}
                  <motion.div
                    className="absolute -bottom-5 left-1/2 z-30 flex items-center justify-center rounded-full border-4 border-white shadow-xl"
                    style={{ width: 40, height: 40, marginLeft: -20, background: "linear-gradient(135deg, #fff, #fbcfe8)" }}
                    animate={isUnlocked ? { rotate: [0, 20, -10, 0], scale: [1, 1.2, 0.9, 1] } : { scale: [1, 1.08, 1] }}
                    transition={isUnlocked ? { duration: 0.6 } : { repeat: Infinity, duration: 2 }}
                  >
                    <Key size={18} className="text-pink-600" />
                  </motion.div>
                </motion.div>

                {/* ── BODY ── */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-b-2xl overflow-hidden"
                  style={{
                    height: 120,
                    background: "linear-gradient(175deg, #f472b6 0%, #ec4899 50%, #db2777 100%)",
                    border: "3px solid #be185d",
                    boxShadow: "0 20px 60px -10px rgba(236,72,153,0.45), inset 0 2px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Body texture dots */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                  {/* Body sheen */}
                  <div className="absolute inset-x-0 top-0 h-6 opacity-25" style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
                  {/* Body straps */}
                  <div className="absolute top-0 bottom-0 left-10 w-3 rounded opacity-40" style={{ background: "#be185d" }} />
                  <div className="absolute top-0 bottom-0 right-10 w-3 rounded opacity-40" style={{ background: "#be185d" }} />
                  {/* Bottom studs */}
                  {[20, 100, 180].map(x => (
                    <div key={x} className="absolute bottom-3 w-3 h-3 rounded-full border-2 border-pink-900/30" style={{ left: x, background: "linear-gradient(135deg,#fff,#fbcfe8)" }} />
                  ))}
                </div>

                {/* ── Ground shadow ── */}
                <motion.div
                  animate={{ scaleX: isUnlocked ? 1.3 : 1, opacity: isUnlocked ? 0.2 : 0.12 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                  style={{ width: 220, height: 24, background: "radial-gradient(ellipse, #db2777, transparent)", filter: "blur(8px)" }}
                />
              </div>
            </div>

            <motion.button
              whileHover={canUnlock ? { scale: 1.05, y: -2 } : {}}
              whileTap={canUnlock ? { scale: 0.98 } : {}}
              onClick={handleUnlock}
              disabled={isUnlocked || !canUnlock}
              className={`group px-16 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(233,30,140,0.2)] transition-all border-b-4 relative overflow-hidden ${isUnlocked || !canUnlock ? "bg-pink-50 text-pink-200 border-pink-100 cursor-not-allowed" : "bg-pink-600 text-white border-pink-800 hover:bg-pink-700"}`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              {!canUnlock ? <><Key size={20} /> Kunci Belum Lengkap</> : (isUnlocked ? "Membuka..." : <><Unlock size={20} /> Gunakan Kunci Pink</>)}
            </motion.button>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-white p-8 md:p-14 rounded-3xl shadow-[0_30px_100px_rgba(233,30,140,0.15)] border-4 border-pink-50 relative"
          >
            {/* Wax Seal (Floating) */}
            <motion.div 
              animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-pink-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white z-10"
            >
               <Heart size={36} className="text-white fill-white drop-shadow-md" />
            </motion.div>

            {/* Letter Content */}
            <div 
               className="text-pink-900 text-left space-y-8 leading-relaxed overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar"
               style={{ fontSize: '17px' }}
            >
               <motion.p 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="text-2xl font-black italic mb-8 border-b-2 border-pink-100 pb-4 inline-block text-pink-600"
               >
                 Teruntuk kamu,
               </motion.p>
               
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                 Selamat! Kamu sudah berhasil mengumpulkan semua kepingan kunci dan membuka peti rahasia ini. Tapi tahukah kamu? Harta karun yang paling berharga sebenarnya bukanlah kado-kado ini...
               </motion.p>

               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="bg-pink-50 p-6 rounded-2xl border-l-4 border-pink-400 italic text-pink-700">
                 "Harta yang paling indah adalah setiap detik kebersamaan, setiap tawa yang kita bagi, dan keberadaanmu yang selalu mencerahkan duniaku."
               </motion.p>

               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                 Terima kasih sudah menjadi versi terbaik dari dirimu sendiri. Di hari ulang tahunmu ini, aku berharap kamu mendapatkan kebahagiaan yang tak terbatas, kesehatan yang selalu terjaga, dan cinta yang tak pernah padam.
               </motion.p>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.5 }}
                 className="text-right font-black italic mt-12 pt-8 border-t-2 border-pink-50"
               >
                 <p className="text-pink-400 text-sm uppercase tracking-widest mb-2">Salam Hangat,</p>
                 <p className="text-4xl text-pink-600 font-black">David Adesta</p>
               </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="mt-12 text-pink-500 font-black uppercase text-[11px] tracking-[0.5em] hover:text-pink-800 transition-colors px-8 py-3 rounded-full border border-pink-100 hover:bg-pink-50"
            >
              Simpan di Hati 🌸
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
