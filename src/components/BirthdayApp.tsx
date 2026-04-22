"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ChevronRight, ChevronLeft, Gift, Paperclip } from "lucide-react";

// Steps: 0 = Landing, 1 = Loading, 2 = Wishes, 3 = Gallery, 4 = Greeting, 5 = Credits

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
        {step === 2 && <Greeting key="greeting" onNext={nextStep} />}
        {step === 3 && <Gallery key="gallery" onNext={nextStep} />}
        {step === 4 && <Wishes key="wishes" onNext={nextStep} />}
        {step === 5 && <Credits key="credits" />}
      </AnimatePresence>
    </div>
  );
}

function Landing({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="z-10 flex flex-col items-center gap-12"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-primary to-pink-light max-w-lg">
          {isOpen ? "A message for you..." : "You've got a letter!"}
        </h1>
      </motion.div>

      {/* Envelope Container */}
      <motion.div 
        className="relative w-80 h-56 cursor-pointer"
        style={{ perspective: "1500px" }}
        onClick={() => !isOpen && setIsOpen(true)}
        whileHover={!isOpen ? { scale: 1.05 } : {}}
        whileTap={!isOpen ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Envelope Back (Inside) */}
        <div className="absolute inset-0 bg-pink-600 rounded-lg shadow-inner overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
        </div>
        
        {/* Letter inside */}
        <motion.div 
          className="absolute left-4 right-4 bg-[#fdfbf7] rounded-md p-6 flex flex-col items-center justify-center gap-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100"
          style={{ height: "180px", bottom: "16px", zIndex: 10, backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '100% 24px' }}
          initial={{ y: 0 }}
          animate={isOpen ? { y: -130 } : { y: 0 }}
          transition={{ delay: isOpen ? 0.4 : 0, type: "spring", stiffness: 90, damping: 14 }}
          whileHover={isOpen ? { y: -140, scale: 1.02 } : {}}
          onClick={(e) => {
            if (isOpen) {
              e.stopPropagation(); // prevent envelope click
              onNext();
            }
          }}
        >
          <div className="text-pink-primary font-bold text-xl uppercase tracking-widest border-b-2 border-pink-100 pb-2 w-full text-center">Open Me</div>
          <Heart className="w-10 h-10 text-pink-primary fill-pink-primary animate-pulse" />
          <p className="text-sm text-gray-500 font-medium opacity-80">Click to read</p>
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

      <p className="text-pink-light font-medium animate-pulse mt-4">
        {isOpen ? "Tap the letter to continue ✨" : "Tap to open"}
      </p>
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
      className="z-10 flex flex-col items-center justify-center p-8 gap-8 min-h-screen relative overflow-hidden w-full"
    >
      {/* Background Balloons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {balloons.map((b, i) => (
          <motion.div
            key={i}
            initial={{ y: "120vh", opacity: 0.7 }}
            animate={{ 
              y: "-20vh",
              x: [0, 15, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              y: { delay: b.delay, duration: b.duration, repeat: Infinity, ease: "linear" },
              x: { delay: b.delay, duration: b.duration / 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { delay: b.delay, duration: b.duration / 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute rounded-full shadow-inner border border-white/30"
            style={{ 
              left: b.left, 
              width: b.size, 
              height: b.size * 1.2, 
              backgroundColor: b.color,
              boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.4)`
            }}
          >
            {/* Balloon string */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-400/30" />
            
            {/* Balloon knot */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-inherit border-b border-black/10" />
          </motion.div>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-primary to-pink-light z-10"
      >
        Cooking up something sweet... 🍰
      </motion.h2>

      {/* Cake Scene */}
      <div className="relative flex flex-col items-center z-10" style={{ width: 260, height: 280 }}>

        {/* ── CANDLE ── */}
        <motion.div
          initial={{ y: -340, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.1, ease: dropEase }}
          className="z-40 relative mb-[-6px] flex flex-col items-center"
        >
          {/* Glow halo */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
            className="absolute -top-4 w-10 h-10 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)", filter: "blur(8px)" }}
          />
          {/* Flame */}
          <motion.div
            animate={{
              scaleY: [1, 1.18, 0.92, 1.08, 1],
              scaleX: [1, 0.85, 1.1, 0.9, 1],
              rotate: [-4, 5, -3, 4, -4],
            }}
            transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
            className="w-4 h-7 rounded-[50%_50%_35%_35%/60%_60%_40%_40%]"
            style={{
              background: "linear-gradient(to top, #f97316, #fb923c, #fde68a)",
              boxShadow: "0 0 14px 4px rgba(251,146,60,0.55)",
              marginBottom: "-2px",
            }}
          />
          {/* Candle stick */}
          <div
            className="w-4 h-12 rounded-t-sm shadow border border-pink-200/40"
            style={{
              background: "linear-gradient(160deg, #fff9f9 30%, #fce7f3 100%)",
            }}
          >
            {/* Decorative stripes */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="mx-0.5 h-0.5 rounded-full bg-pink-200/50" style={{ marginTop: i === 0 ? 8 : 9 }} />
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
          {/* Dripping cream */}
          <div className="flex w-full justify-around px-1" style={{ marginBottom: -1 }}>
            {[7, 5, 9, 6, 7].map((h, i) => (
              <div
                key={i}
                className="rounded-b-full shadow-sm"
                style={{ width: 9, height: h, background: "#fff", border: "1px solid #fef3c7" }}
              />
            ))}
          </div>
          {/* Cake body */}
          <div
            className="w-full shadow-md rounded-b-sm overflow-hidden"
            style={{ height: 48, background: "linear-gradient(to bottom, #fffbeb, #fef9ec, #fde68a22)" }}
          >
            <div className="w-full h-2.5 rounded-sm" style={{ background: "rgba(255,255,255,0.7)" }} />
            <div className="flex justify-around items-center px-2 mt-2">
              {["#fca5a5","#fcd34d","#a5f3fc"].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: c }} />
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
          {/* White cream stripe */}
          <div className="w-full h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.85)", marginBottom: -1 }} />
          <div
            className="w-full shadow-lg rounded-b-sm overflow-hidden"
            style={{ height: 60, background: "linear-gradient(to bottom, #fef3c7, #fffbeb, #fef9ec)" }}
          >
            {/* Filling line */}
            <div className="w-full h-2 mt-8 opacity-40" style={{ background: "#fde68a" }} />
          </div>
        </motion.div>

        {/* ── BOTTOM LAYER (largest) ── */}
        <motion.div
          initial={{ y: -320, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.15, ease: dropEase }}
          className="z-10 relative flex flex-col items-center"
          style={{ width: 220 }}
        >
          <div className="w-full h-3.5 rounded-sm" style={{ background: "rgba(255,255,255,0.85)", marginBottom: -1 }} />
          <div
            className="w-full shadow-xl rounded-b-sm overflow-hidden"
            style={{ height: 76, background: "linear-gradient(to bottom, #fffbeb, #fef9ec, #fef3c7)" }}
          >
            <div className="flex justify-around items-center px-4 mt-5">
              {["#fca5a5","#fde68a","#86efac","#fca5a5","#a5f3fc","#fde68a"].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: c }} />
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
          style={{ width: 236, marginTop: -3, transformOrigin: "50% 50%" }}
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="rounded-b-full border shadow-sm"
              style={{ width: 14, height: 12, background: "#fff", borderColor: "#fde68a44" }} />
          ))}
        </motion.div>

        {/* ── PLATE ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.7, ease: "easeOut" }}
          style={{
            width: 270, height: 12, marginTop: 4,
            background: "linear-gradient(to right, #e5e7eb, #ffffff, #e5e7eb)",
            borderRadius: 9999, transformOrigin: "50% 50%",
            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb"
          }}
        />
      </div>

      {/* Loading bar */}
      <div className="w-64 h-3 bg-pink-soft rounded-full overflow-hidden mt-6 shadow-inner border border-pink-100 relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full absolute left-0 top-0"
          style={{ background: "linear-gradient(to right, #ff69b4, #ff1493, #ff69b4)" }}
        />
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
                className={`absolute inset-0 rounded-md border-4 border-slate-800 p-6 sm:p-8 md:p-12 flex flex-col items-center text-center cursor-pointer shadow-[12px_12px_0_rgba(0,0,0,0.1)] ${msg.color}`}
                initial={false}
                animate={{
                  top: stackedOffset * 10,
                  right: -stackedOffset * 6,
                  scale: 1 - stackedOffset * 0.04,
                  rotate: isTop ? msg.rotation : msg.rotation + (stackedOffset * 1.5),
                  zIndex: messages.length - index
                }}
                exit={{ x: -500, y: 100, opacity: 0, rotate: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={isTop ? handleNextNote : undefined}
                whileHover={isTop ? { scale: 1.01 } : {}}
              >
                {/* Paperclip */}
                <Paperclip className="absolute -top-6 right-10 w-12 h-12 text-slate-800 drop-shadow-sm stroke-[3]" />

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
                    className="absolute -top-12 left-6 text-6xl md:text-7xl drop-shadow-md z-40"
                  >
                    {msg.icon}
                  </motion.div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center w-full mt-4">
                  <p className="font-bold text-slate-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed whitespace-pre-wrap z-10">
                    {msg.text}
                  </p>
                </div>
                
                {/* From / Signature */}
                <div className="w-full text-right mt-auto pt-4 md:pt-6 border-t-2 border-slate-800/20 z-10 mb-4 md:mb-6">
                  <p className="font-bold text-slate-700 text-lg md:text-2xl italic">
                    - {msg.from}
                  </p>
                </div>

                {/* Cat Paws holding the letter */}
                {isTop && (
                  <>
                    {/* Left Paw */}
                    <motion.div 
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      className="absolute -bottom-8 left-8 sm:left-12 z-50 pointer-events-none scale-75 md:scale-100 origin-bottom"
                    >
                      <div className="relative w-16 h-20 bg-white border-4 border-slate-800 rounded-t-full shadow-md">
                        {/* Toe beans */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                          <div className="w-3 h-4 bg-pink-200 rounded-full" />
                          <div className="w-3 h-5 bg-pink-200 rounded-full -translate-y-1" />
                          <div className="w-3 h-4 bg-pink-200 rounded-full" />
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-6 bg-pink-200 rounded-full" />
                      </div>
                    </motion.div>

                    {/* Right Paw */}
                    <motion.div 
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      className="absolute -bottom-8 right-8 sm:right-12 z-50 pointer-events-none scale-75 md:scale-100 origin-bottom"
                    >
                      <div className="relative w-16 h-20 bg-white border-4 border-slate-800 rounded-t-full shadow-md">
                        {/* Toe beans */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                          <div className="w-3 h-4 bg-pink-200 rounded-full" />
                          <div className="w-3 h-5 bg-pink-200 rounded-full -translate-y-1" />
                          <div className="w-3 h-4 bg-pink-200 rounded-full" />
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-6 bg-pink-200 rounded-full" />
                      </div>
                    </motion.div>
                  </>
                )}

                {isTop && (
                  <p className="absolute bottom-[-32px] transform translate-y-full text-xs md:text-sm font-extrabold text-slate-800 animate-pulse uppercase tracking-widest bg-white/80 px-4 py-2 rounded-full shadow-md border-2 border-slate-800">
                    {index === messages.length - 1 ? "Finish" : "Tap Here"}
                  </p>
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
      className="z-10 flex flex-col items-center w-full max-w-[90%] md:max-w-md px-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-pink-primary">A Sweet Memory</h2>

      <div className="relative w-full aspect-[3/4] bg-[#fdfbf7] p-4 pb-16 rounded-md shadow-xl border border-gray-200 mb-8 flex flex-col items-center">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none rounded-md" />
        
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover rounded border border-gray-200 shadow-sm"
            alt="Gallery"
          />
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-pink-primary text-xl uppercase tracking-widest border-t-2 border-pink-50 pt-2 mx-6">
          Memory {index + 1}
        </div>
        
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 opacity-100 transition-opacity z-20">
          <button onClick={handlePrev} className="p-2 -ml-6 rounded-full bg-white shadow-md text-pink-primary hover:bg-pink-50 transition-colors cursor-pointer border border-pink-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} className="p-2 -mr-6 rounded-full bg-white shadow-md text-pink-primary hover:bg-pink-50 transition-colors cursor-pointer border border-pink-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        onClick={onNext}
        className="px-8 py-3 bg-pink-primary text-white rounded-full font-bold shadow-lg hover:bg-pink-light hover:-translate-y-1 transition-all cursor-pointer"
      >
        Continue ❤️
      </button>
    </motion.div>
  );
}

function Greeting({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", bounce: 0.5 }}
      className="z-10 flex flex-col items-center text-center px-4"
    >
      <div className="relative w-full flex justify-center mb-8">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
          <Stars className="w-24 h-24 text-pink-primary opacity-50" />
        </motion.div>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-primary via-pink-400 to-pink-primary mb-4 pb-2">
        Happy Birthday!
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 max-w-md font-medium mb-12">
        You make the world a prettier place just by being in it. Have the most wonderful day! 🎊
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 bg-pink-primary text-white rounded-full font-bold shadow-lg hover:bg-pink-light hover:-translate-y-1 transition-all cursor-pointer"
      >
        Lanjut ❤️
      </button>
    </motion.div>
  );
}

function Credits() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="z-10 flex flex-col items-center p-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-50"
    >
      <h2 className="text-2xl font-bold text-pink-primary mb-8 tracking-wide">Dev & Support</h2>
      <div className="flex flex-col gap-6 text-center">
        <div>
          <p className="text-xs text-pink-light uppercase tracking-[0.2em] font-semibold mb-2">Developer</p>
          <p className="text-xl font-medium text-gray-800"></p>
        </div>
        <div className="w-12 h-px bg-pink-200 mx-auto my-2" />
        <div>
          <p className="text-xs text-pink-light uppercase tracking-[0.2em] font-semibold mb-2">Support</p>
          <p className="text-xl font-medium text-gray-800"></p>
        </div>
      </div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10"
      >
        <Heart className="w-8 h-8 fill-pink-primary text-pink-primary" />
      </motion.div>
    </motion.div>
  );
}
