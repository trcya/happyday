"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ChevronRight, ChevronLeft, Gift, Paperclip } from "lucide-react";

// Steps: 0 = Landing, 1 = Loading, 2 = GiftBox, 3 = Greeting, 4 = Gallery, 5 = Wishes, 6 = Credits

export default function BirthdayApp() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => s + 1);

  return (
    <div className="relative min-h-screen w-full bg-white text-pink-primary overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-pink-light selection:text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-soft via-white to-white" />

      <AnimatePresence mode="wait">
        {step === 0 && <Landing key="landing" onNext={nextStep} />}
        {step === 1 && <Loading key="loading" onNext={nextStep} />}
        {step === 2 && <GiftBox key="gift" onNext={nextStep} />}
        {step === 3 && <Greeting key="greeting" onNext={nextStep} />}
        {step === 4 && <Gallery key="gallery" onNext={nextStep} />}
        {step === 5 && <Wishes key="wishes" onNext={nextStep} />}
        {step === 6 && <Credits key="credits" />}
      </AnimatePresence>
    </div>
  );
}

function Landing({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sparkles, setSparkles] = useState<{ x: string; y: string; scale: number; duration: number }[]>([]);

  useEffect(() => {
    const generated = [...Array(12)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + 2,
    }));
    setSparkles(generated);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="z-10 flex flex-col items-center gap-12 relative w-full h-full min-h-screen justify-center overflow-hidden"
    >
      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 opacity-40"
            initial={{ 
              x: s.x, 
              y: s.y,
              scale: s.scale
            }}
            animate={{ 
              y: [null, "-20px", "20px", "0px"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: s.duration, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {i % 2 === 0 ? <Heart size={24} fill="currentColor" /> : <Stars size={24} />}
          </motion.div>
        ))}
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 p-8 text-pink-200 hidden md:block">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <Stars size={64} className="opacity-20" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 p-8 text-pink-200 hidden md:block">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
          <Stars size={80} className="opacity-20" />
        </motion.div>
      </div>

      {/* Peeking Cat */}
      <motion.div 
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 text-6xl opacity-30 select-none hidden lg:block"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🐱
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="z-20"
      >
        <h1 className="text-4xl md:text-6xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-primary via-pink-400 to-pink-light max-w-2xl drop-shadow-sm px-4">
          {isOpen ? "A special gift for you..." : "A surprise is waiting!"}
        </h1>
        {!isOpen && (
          <p className="text-pink-primary/40 text-center mt-2 font-medium tracking-widest uppercase text-xs">
            Personal & Confidential
          </p>
        )}
      </motion.div>

      {/* Envelope Container */}
      <motion.div 
        className="relative w-80 h-56 cursor-pointer z-30"
        style={{ perspective: "1500px" }}
        onClick={() => !isOpen && setIsOpen(true)}
        whileHover={!isOpen ? { scale: 1.05, rotate: 1 } : {}}
        whileTap={!isOpen ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Envelope Shadow (Dynamic) */}
        <div className="absolute -inset-4 bg-pink-primary/10 rounded-full blur-3xl opacity-50 z-0 animate-pulse" />

        {/* Envelope Back (Inside) */}
        <div className="absolute inset-0 bg-pink-600 rounded-lg shadow-inner overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
        </div>
        
        {/* Letter inside */}
        <motion.div 
          className="absolute left-4 right-4 bg-[#fffaf0] rounded-sm p-6 flex flex-col items-center justify-center gap-3 shadow-[0_4px_25px_rgba(0,0,0,0.15)] border-2 border-[#f3e5ab] relative overflow-hidden"
          style={{ 
            height: "200px", 
            bottom: "16px", 
            zIndex: 10, 
            backgroundImage: 'repeating-linear-gradient(#fffaf0 0px, #fffaf0 23px, #f3e5ab 24px)'
          }}
          initial={{ y: 0 }}
          animate={isOpen ? { y: -160 } : { y: 0 }}
          transition={{ delay: isOpen ? 0.4 : 0, type: "spring", stiffness: 90, damping: 14 }}
          whileHover={isOpen ? { y: -175, scale: 1.05, rotate: -1 } : {}}
          onClick={(e) => {
            if (isOpen) {
              e.stopPropagation(); // prevent envelope click
              onNext();
            }
          }}
        >
          {/* Postage Stamp */}
          <div className="absolute top-2 right-2 w-10 h-12 bg-white/80 border-2 border-dashed border-pink-200 flex items-center justify-center rotate-6 shadow-sm z-20">
             <Heart size={16} className="text-pink-primary fill-pink-primary opacity-60" />
          </div>

          <div className="text-pink-primary font-bold text-2xl italic mb-1 z-10 drop-shadow-sm font-serif">Hello, You! ✨</div>
          
          <motion.div
             animate={{ 
               scale: [1, 1.15, 1],
               rotate: [-2, 2, -2]
             }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
             className="z-10"
          >
            <Heart className="w-14 h-14 text-pink-primary fill-pink-primary drop-shadow-[0_0_8px_rgba(255,20,147,0.4)]" />
          </motion.div>

          <div className="flex flex-col items-center gap-1 z-10 bg-white/40 px-3 py-1 rounded-full backdrop-blur-[1px] border border-pink-100">
             <p className="text-[10px] text-pink- primary font-black tracking-[0.2em] uppercase">Secret Message</p>
             <p className="text-[9px] text-gray-500 font-bold animate-pulse">TAP TO UNVEIL THE SURPRISE</p>
          </div>
          
          {/* Decorative Corner Stars */}
          <Stars size={14} className="absolute bottom-2 left-2 text-pink-300 opacity-50" />
          <Stars size={12} className="absolute bottom-1.5 right-1.5 text-pink-300 opacity-50" />
        </motion.div>

        {/* Envelope Side Flaps */}
        <div 
          className="absolute inset-0 bg-pink-500 rounded-b-lg z-[15] pointer-events-none drop-shadow-md"
          style={{ clipPath: "polygon(0 0, 50% 55%, 0 100%)" }}
        />
        <div 
          className="absolute inset-0 bg-pink-500 rounded-b-lg z-[15] pointer-events-none drop-shadow-md"
          style={{ clipPath: "polygon(100% 0, 50% 55%, 100% 100%)" }}
        />

        {/* Envelope Front Pocket */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-b-lg shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-20 pointer-events-none"
          style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="absolute inset-0 opacity-20 border-t-2 border-white mix-blend-overlay" />
        </div>
        
        {/* Envelope Top Flap */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[65%] origin-top pointer-events-none drop-shadow-xl"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: 0, zIndex: 30 }}
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 30 }}
          transition={{ 
            rotateX: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            zIndex: { delay: isOpen ? 0.2 : 0 } 
          }}
        >
          {/* Front of the flap (visible when closed) */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg flex items-end justify-center pb-4"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
          >
            {/* Wax Seal */}
            <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.5),0_3px_5px_rgba(0,0,0,0.2)] border border-red-600">
              <Heart className="w-6 h-6 text-red-100 fill-red-200" />
            </div>
          </div>
          {/* Back of the flap (visible when open) */}
          <div 
            className="absolute inset-0 w-full h-full bg-pink-200 rounded-t-lg"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
          </div>
        </motion.div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-pink-light font-bold animate-bounce mt-4 z-20 flex items-center gap-2"
      >
        {isOpen ? "Tap the letter to continue ✨" : "Click the wax seal to open 💌"}
      </motion.p>
    </motion.div>
  );
}

function GiftBox({ onNext }: { onNext: () => void }) {
  const [isGlowed, setIsGlowed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
      className="z-10 flex flex-col items-center justify-center p-8 min-h-screen relative overflow-hidden w-full bg-gradient-to-b from-pink-50 via-white to-pink-50"
    >
      {/* Intense Radial Glow Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-[500px] h-[500px] bg-pink-300 rounded-full blur-[100px]"
        />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: 0
            }}
            animate={{ 
              scale: [0, 1, 0],
              y: [null, "-50px"] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-pink-primary opacity-40"
          >
            <Stars size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-16 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-black text-pink-primary tracking-tight mb-4">
           You've Unlocked a Gift! 🎁
        </h2>
        <p className="text-pink-light font-bold uppercase tracking-[0.4em] text-xs">Tap the box to open your surprise</p>
      </motion.div>

      {/* Magical Gift Box */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="relative w-64 h-64 cursor-pointer z-20 group"
      >
        {/* Aura Glow */}
        <div className="absolute -inset-10 bg-pink-primary/20 rounded-full blur-3xl group-hover:bg-pink-primary/30 transition-all duration-500 animate-pulse" />
        
        {/* Box Body */}
        <div className="absolute inset-x-4 bottom-0 h-40 bg-pink-primary rounded-lg shadow-2xl relative overflow-hidden border-2 border-pink-600">
           {/* Box stripes/texture */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] bg-[length:15px_15px]" />
           {/* Ribbon around box */}
           <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-pink-300 shadow-md z-10 border-x border-pink-400" />
        </div>

        {/* Box Lid */}
        <motion.div 
           animate={{ y: [0, -5, 0] }}
           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
           className="absolute inset-x-0 top-16 h-12 bg-pink-primary rounded-md shadow-lg z-20 border-2 border-pink-600"
        >
           {/* Ribbon on lid */}
           <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-pink-300 shadow-sm border-x border-pink-400" />
           {/* Bow */}
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-12 flex relative">
              <div className="w-10 h-10 bg-pink-300 border-2 border-pink-400 rounded-full rotate-45 flex-shrink-0 -mr-4 shadow-md" />
              <div className="w-10 h-10 bg-pink-300 border-2 border-pink-400 rounded-full -rotate-45 flex-shrink-0 -ml-4 shadow-md" />
           </div>
        </motion.div>

        {/* Sparkle effects emanating from box */}
        <motion.div
           animate={{ 
             scale: [0.8, 1.2, 0.8],
             opacity: [0.5, 1, 0.5]
           }}
           transition={{ repeat: Infinity, duration: 1.5 }}
           className="absolute -top-16 left-1/2 -translate-x-1/2 text-5xl pointer-events-none"
        >
           ✨
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-16 z-10 flex flex-col items-center gap-2"
      >
        <div className="flex gap-2">
           {[...Array(3)].map((_, i) => (
             <Heart key={i} size={16} fill="currentColor" className="text-pink-primary" />
           ))}
        </div>
        <p className="text-pink-primary font-black uppercase tracking-[0.2em] text-[10px]">What's inside?</p>
      </motion.div>
    </motion.div>
  );
}

function Loading({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 5500);
    return () => clearTimeout(timer);
  }, [onNext]);

  // Ease: smooth deceleration like a feather landing
  const dropEase = [0.16, 1, 0.3, 1] as const;

  // Balloon data
  const balloons = [
    { color: "#ffc8dd", size: 40, left: "10%", delay: 0.5, duration: 4.5 },
    { color: "#bde0fe", size: 50, left: "25%", delay: 1.2, duration: 5.0 },
    { color: "#fcf6bd", size: 45, left: "45%", delay: 0.2, duration: 4.2 },
    { color: "#d8f3dc", size: 38, left: "65%", delay: 1.8, duration: 4.8 },
    { color: "#cdb4db", size: 42, left: "85%", delay: 0.8, duration: 4.0 },
    { color: "#ffafcc", size: 46, left: "15%", delay: 2.5, duration: 5.2 },
    { color: "#a2d2ff", size: 35, left: "75%", delay: 3.1, duration: 4.3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="z-10 flex flex-col items-center justify-center p-8 gap-12 min-h-screen relative overflow-hidden w-full bg-gradient-to-b from-white via-pink-50/20 to-white"
    >
      {/* Background Balloons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {balloons.map((b, i) => (
          <motion.div
            key={i}
            initial={{ y: "120vh", opacity: 0.7 }}
            animate={{ 
              y: "-20vh",
              x: [0, 20, -20, 0],
              rotate: [0, 8, -8, 0]
            }}
            transition={{ 
              y: { delay: b.delay, duration: b.duration, repeat: Infinity, ease: "linear" },
              x: { delay: b.delay, duration: b.duration / 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { delay: b.delay, duration: b.duration / 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute rounded-full shadow-inner border border-white/40"
            style={{ 
              left: b.left, 
              width: b.size, 
              height: b.size * 1.25, 
              backgroundColor: b.color,
              boxShadow: `inset -6px -10px 20px rgba(0,0,0,0.1), inset 6px 10px 20px rgba(255,255,255,0.5)`
            }}
          >
            {/* Balloon string - curved */}
            <svg className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4 h-16 opacity-30">
              <path d="M2,0 Q8,8 2,16 T2,32" stroke="gray" fill="transparent" strokeWidth="1" />
            </svg>
            
            {/* Balloon knot */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-inherit border-b border-black/5" />
          </motion.div>
        ))}
      </div>

      <div className="text-center z-10 space-y-2">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-primary via-pink-400 to-pink-light tracking-tight"
        >
          Something sweet is coming...
        </motion.h2>
        <p className="text-pink-primary/40 font-bold uppercase tracking-[0.3em] text-[10px]">Please wait a moment</p>
      </div>

      {/* Cake Scene with enhanced details */}
      <div className="relative flex flex-col items-center z-10" style={{ width: 260, height: 320 }}>

        {/* ── CHERRY ON TOP ── */}
        <motion.div
           initial={{ y: -400, opacity: 0, scale: 0 }}
           animate={{ y: -10, opacity: 1, scale: 1 }}
           transition={{ delay: 3.8, duration: 0.8, ease: dropEase }}
           className="z-50 relative mb-[-6px]"
        >
           <div className="w-8 h-8 bg-red-600 rounded-full shadow-lg relative border-b-2 border-red-800">
              <div className="absolute top-1 right-2 w-2 h-2 bg-white/40 rounded-full" />
              <div className="absolute -top-4 right-1/2 w-1 h-6 border-l-2 border-green-700 rotate-15 rounded-full" />
           </div>
        </motion.div>

        {/* ── CANDLE ── */}
        <motion.div
          initial={{ y: -340, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.1, ease: dropEase }}
          className="z-40 relative mb-[-6px] flex flex-col items-center"
        >
          {/* Glow halo */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute -top-6 w-12 h-12 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)", filter: "blur(10px)" }}
          />
          {/* Flame - more realistic */}
          <motion.div
            animate={{
              scaleY: [1, 1.15, 0.95, 1.1, 1],
              scaleX: [1, 0.9, 1.05, 0.95, 1],
              rotate: [-2, 3, -2, 4, -2],
              y: [0, -1, 1, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-5 h-8 rounded-[50%_50%_35%_35%/60%_60%_40%_40%] relative"
            style={{
              background: "linear-gradient(to top, #ea580c, #f59e0b, #fef3c7)",
              boxShadow: "0 0 15px 5px rgba(245,158,11,0.4)",
              marginBottom: "-2px",
            }}
          >
             <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-full scale-50" />
          </motion.div>
          {/* Candle stick */}
          <div
            className="w-4 h-14 rounded-t-full shadow-inner border border-pink-100 flex flex-col overflow-hidden"
            style={{ background: "linear-gradient(160deg, #fff 30%, #fce7f3 100%)" }}
          >
             {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-1 bg-pink-100/40 -rotate-12 mt-1" />
             ))}
          </div>
        </motion.div>

        {/* ── TOP LAYER (smallest) ── */}
        <motion.div
          initial={{ y: -320, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.1, duration: 1.0, ease: dropEase }}
          className="z-30 relative flex flex-col items-center"
          style={{ width: 100 }}
        >
          {/* Enhanced Dripping cream */}
          <div className="flex w-full justify-around px-1" style={{ marginBottom: -3 }}>
            {[10, 6, 12, 8, 10].map((h, i) => (
              <div
                key={i}
                className="rounded-b-full shadow-sm z-10"
                style={{ width: 10, height: h, background: "white", border: "1px solid #fef3c7" }}
              />
            ))}
          </div>
          {/* Cake body */}
          <div
            className="w-full shadow-md rounded-b-lg overflow-hidden border-x border-b border-pink-50"
            style={{ height: 48, background: "linear-gradient(180deg, #fffbeb, #fef3c7)" }}
          >
            <div className="w-full h-3 bg-white/60" />
            <div className="flex justify-around items-center px-2 mt-4">
              {["#fda4af","#fcd34d","#67e8f9"].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── MIDDLE LAYER ── */}
        <motion.div
          initial={{ y: -320, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 1.0, ease: dropEase }}
          className="z-20 relative flex flex-col items-center"
          style={{ width: 160 }}
        >
          <div className="w-full h-3.5 rounded-t-sm" style={{ background: "rgba(255,255,255,0.9)", marginBottom: -1 }} />
          <div
            className="w-full shadow-lg rounded-b-lg overflow-hidden border-x border-b border-pink-50"
            style={{ height: 62, background: "linear-gradient(180deg, #fef3c7, #fffbeb)" }}
          >
            {/* Filling line with sprinkles */}
            <div className="w-full h-2.5 mt-8 flex justify-around items-center opacity-40" style={{ background: "#fde68a" }}>
               {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-pink-400" />
               ))}
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM LAYER ── */}
        <motion.div
          initial={{ y: -320, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.15, ease: dropEase }}
          className="z-10 relative flex flex-col items-center"
          style={{ width: 220 }}
        >
          <div className="w-full h-4 rounded-t-sm" style={{ background: "rgba(255,255,255,0.9)", marginBottom: -1 }} />
          <div
            className="w-full shadow-xl rounded-b-xl overflow-hidden border-x border-b border-pink-50 relative"
            style={{ height: 80, background: "linear-gradient(180deg, #fffbeb, #fef3c7)" }}
          >
             {/* Sparkle effects on bottom layer */}
            <div className="flex justify-around items-center px-4 mt-6">
              {["#f43f5e","#fbbf24","#10b981","#f43f5e","#0ea5e9","#fbbf24"].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full shadow-inner opacity-70" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── FROSTING SCALLOP ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
          className="flex justify-around z-10"
          style={{ width: 236, marginTop: -4, transformOrigin: "50% 50%" }}
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="rounded-b-full border shadow-sm"
              style={{ width: 14, height: 14, background: "white", borderColor: "#fde68a22" }} />
          ))}
        </motion.div>

        {/* ── PLATE ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.7, ease: "easeOut" }}
          style={{
            width: 280, height: 16, marginTop: 6,
            background: "linear-gradient(to right, #f3f4f6, #ffffff, #f3f4f6)",
            borderRadius: 9999, transformOrigin: "50% 50%",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            border: "1px solid #e5e7eb"
          }}
        />
      </div>

      {/* Loading bar enhanced with glow */}
      <div className="space-y-4 flex flex-col items-center">
        <div className="w-72 h-4 bg-pink-100/50 rounded-full overflow-hidden shadow-inner border border-white relative z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full absolute left-0 top-0 shadow-[0_0_15px_rgba(255,20,147,0.5)]"
            style={{ 
              background: "linear-gradient(to right, #ff69b4, #ff1493, #ff69b4)",
            }}
          />
        </div>
        <motion.p 
           animate={{ opacity: [0.4, 1, 0.4] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="text-[10px] font-black text-pink-primary uppercase tracking-[0.4em]"
        >
           Assembling Happiness
        </motion.p>
      </div>
    </motion.div>
  );
}

function Wishes({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    { text: "Happy Level Up Day!\nSemoga harimu penuh kebahagiaan dan senyum manis. 🥳", from: "Nama Pengirim", color: "bg-[#bde0fe]", rotation: -2, icon: "🐱" }, // Pastel Blue
    { text: "Terima kasih sudah menjadi orang yang luar biasa!\nJangan lupa senyum hari ini! ✨", from: "Nama Pengirim", color: "bg-[#ffc8dd]", rotation: 3, icon: "😺" }, // Pastel Pink
    { text: "Semoga semua memori, harapan, dan mimpimu satu per satu bisa tercapai. 🌟", from: "Nama Pengirim", color: "bg-[#fcf6bd]", rotation: -1, icon: "😸" }, // Pastel Yellow
    { text: "Tetap jadi dirimu sendiri yang menggemaskan!\nYou are loved by many! 🥰", from: "Nama Pengirim", color: "bg-[#d8f3dc]", rotation: 4, icon: "😻" }, // Pastel Green
    { text: "Enjoy your special day to the fullest!\nSekali lagi, Happy Birthday! ❤️", from: "Nama Pengirim", color: "bg-[#e8ccbf]", rotation: -3, icon: "😽" }, // Pastel Muted Orange/Brown
  ];

  const handleNextNote = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="z-10 flex flex-col items-center justify-center p-4 w-full h-full min-h-screen"
    >
      <div className="relative w-80 h-[32rem] sm:w-full sm:max-w-md md:max-w-2xl h-[34rem] md:h-[36rem] flex items-center justify-center">
        <AnimatePresence>
          {messages.map((msg, index) => {
            if (index < currentIndex) return null; // Discarded notes

            const isTop = index === currentIndex;
            const stackedOffset = index - currentIndex;

            return (
               <motion.div
                key={index}
                className={`absolute inset-0 rounded-2xl border-4 border-slate-800 p-6 sm:p-8 md:p-12 flex flex-col items-center text-center cursor-pointer shadow-[12px_12px_0_rgba(30,41,59,1)] ${msg.color}`}
                initial={false}
                animate={{
                  top: stackedOffset * 8,
                  right: -stackedOffset * 4,
                  scale: 1 - stackedOffset * 0.03,
                  rotate: isTop ? msg.rotation : msg.rotation + (stackedOffset * 2),
                  zIndex: messages.length - index
                }}
                exit={{ x: -600, y: 100, opacity: 0, rotate: -45, transition: { duration: 0.5 } }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                onClick={isTop ? handleNextNote : undefined}
                whileHover={isTop ? { y: -5, x: -2 } : {}}
              >
                {/* Paperclip */}
                <Paperclip className="absolute -top-6 right-12 w-12 h-12 text-slate-800 drop-shadow-sm stroke-[3]" />

                {/* Animated Cat Emoji */}
                {isTop && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, rotate: [-5, 5, -5] }}
                    transition={{
                      y: { type: "spring", stiffness: 300, delay: 0.2 },
                      opacity: { delay: 0.2 },
                      rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    }}
                    className="absolute -top-14 left-8 text-7xl md:text-8xl drop-shadow-lg z-40"
                  >
                    {msg.icon}
                  </motion.div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center w-full mt-6">
                  <p className="font-bold text-slate-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed whitespace-pre-wrap z-10 px-2">
                    {msg.text}
                  </p>
                </div>
                
                {/* From / Signature */}
                <div className="w-full text-right mt-auto pt-6 border-t-2 border-slate-800/10 z-10 mb-6 md:mb-8">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1 opacity-60">With Love,</p>
                  <p className="font-serif italic text-slate-700 text-xl md:text-3xl">
                    - {msg.from}
                  </p>
                </div>

                {/* Cat Paws holding the letter - More integrated */}
                {isTop && (
                  <>
                    <motion.div 
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      className="absolute -bottom-10 left-10 sm:left-16 z-50 pointer-events-none scale-90 md:scale-110 origin-bottom"
                    >
                      <div className="relative w-16 h-24 bg-white border-4 border-slate-800 rounded-t-full shadow-lg">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                          <div className="w-3 h-4 bg-pink-100 rounded-full" />
                          <div className="w-3 h-5 bg-pink-100 rounded-full -translate-y-1" />
                          <div className="w-3 h-4 bg-pink-100 rounded-full" />
                        </div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-9 h-7 bg-pink-100 rounded-full" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      className="absolute -bottom-10 right-10 sm:right-16 z-50 pointer-events-none scale-90 md:scale-110 origin-bottom"
                    >
                      <div className="relative w-16 h-24 bg-white border-4 border-slate-800 rounded-t-full shadow-lg">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                          <div className="w-3 h-4 bg-pink-100 rounded-full" />
                          <div className="w-3 h-5 bg-pink-100 rounded-full -translate-y-1" />
                          <div className="w-3 h-4 bg-pink-100 rounded-full" />
                        </div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-9 h-7 bg-pink-100 rounded-full" />
                      </div>
                    </motion.div>
                  </>
                )}

                {isTop && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <p className="text-[10px] md:text-xs font-black text-slate-800 animate-pulse uppercase tracking-[0.3em] bg-white border-2 border-slate-800 px-6 py-2.5 rounded-full shadow-[4px_4px_0_rgba(30,41,59,1)]">
                      {index === messages.length - 1 ? "Click to Finish" : "Tap to Continue"}
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

function Gallery({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1582206684807-fcf870f2f359?q=80&w=800&auto=format&fit=crop", // Party
    "https://images.unsplash.com/photo-1558636508-e0db3814ebd1?q=80&w=800&auto=format&fit=crop", // Flowers
    "https://images.unsplash.com/photo-1543794327-59a91fb015d8?q=80&w=800&auto=format&fit=crop"  // Birthday aesthetic
  ];

  const handleNext = () => setIndex((i) => (i + 1) % images.length);
  const handlePrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="z-10 flex flex-col items-center w-full max-w-[95%] sm:max-w-md px-4"
    >
      <motion.h2 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-black mb-8 text-pink-primary tracking-tight"
      >
        Sweet Memories ✨
      </motion.h2>

      <div className="relative w-full aspect-[4/5] bg-white p-4 pb-20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-pink-50 mb-10 flex flex-col items-center group">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none rounded-sm" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -20, rotate: -2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <img
              src={images[index]}
              className="w-full h-full object-cover rounded shadow-inner"
              alt="Gallery"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Memory Caption Area */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="flex flex-col items-center">
            <div className="w-8 h-1 bg-pink-100 rounded-full mb-3" />
            <p className="font-serif italic text-pink-light text-2xl">
              Memory No. {index + 1}
            </p>
          </div>
        </div>
        
        {/* Navigation Buttons - More integrated */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none">
          <button 
            onClick={handlePrev} 
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-pink-primary hover:bg-pink-primary hover:text-white transition-all cursor-pointer border border-pink-50 pointer-events-auto active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext} 
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-pink-primary hover:bg-pink-primary hover:text-white transition-all cursor-pointer border border-pink-50 pointer-events-auto active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-10 py-4 bg-gradient-to-r from-pink-primary to-pink-light text-white rounded-full font-black shadow-[0_10px_20px_rgba(255,20,147,0.3)] hover:shadow-[0_15px_30px_rgba(255,20,147,0.4)] transition-all cursor-pointer uppercase tracking-widest text-sm"
      >
        Keep Going ❤️
      </motion.button>
    </motion.div>
  );
}

function Greeting({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="z-10 flex flex-col items-center text-center px-6 max-w-lg"
    >
      <div className="relative mb-12">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1] 
          }} 
          transition={{ 
            rotate: { repeat: Infinity, duration: 15, ease: "linear" },
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
          className="relative"
        >
          <Stars className="w-32 h-32 text-pink-primary opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Gift className="w-16 h-16 text-pink-primary" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-primary to-pink-light mb-6 tracking-tight"
      >
        Happy<br/>Birthday!
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-gray-600 font-medium mb-12 leading-relaxed"
      >
        You make the world shine brighter just by being in it. Have an absolutely magical day! ✨
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-12 py-4 bg-pink-primary text-white rounded-full font-black shadow-xl hover:bg-pink-light transition-all cursor-pointer uppercase tracking-widest text-sm"
      >
        See Credits ❤️
      </motion.button>
    </motion.div>
  );
}

function Credits() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="z-10 flex flex-col items-center p-12 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 max-w-xs w-full"
    >
      <h2 className="text-sm font-black text-pink-primary mb-10 tracking-[0.3em] uppercase opacity-50">
        Created With Love
      </h2>
      
      <div className="flex flex-col gap-10 text-center w-full">
        <div>
          <p className="text-[10px] text-pink-light uppercase tracking-[0.2em] font-bold mb-3">Designed By</p>
          <p className="text-2xl font-serif italic text-gray-800">David Adesta</p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
        </div>
        
        <div>
          <p className="text-[10px] text-pink-light uppercase tracking-[0.2em] font-bold mb-3">Powered By</p>
          <p className="text-xl font-bold text-gray-800 tracking-tight">Happy Moments</p>
        </div>
      </div>

      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-12"
      >
        <Heart className="w-10 h-10 fill-pink-primary text-pink-primary drop-shadow-lg" />
      </motion.div>
      
      <p className="mt-8 text-[10px] font-bold text-pink-light uppercase tracking-widest opacity-40">
        © 2024 All Rights Reserved
      </p>
    </motion.div>
  );
}
