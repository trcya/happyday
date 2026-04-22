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
      <div 
        className="relative w-80 h-56 cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => !isOpen && setIsOpen(true)}
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
          animate={isOpen ? { y: -120 } : { y: 0 }}
          transition={{ delay: isOpen ? 0.6 : 0, duration: 0.7, type: "spring", stiffness: 100 }}
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
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 30 }}
          transition={{ 
            rotateX: { duration: 0.8, ease: "easeInOut" },
            zIndex: { delay: isOpen ? 0.4 : 0 } 
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
      </div>

      <p className="text-pink-light font-medium animate-pulse mt-4">
        {isOpen ? "Tap the letter to continue ✨" : "Tap to open"}
      </p>
    </motion.div>
  );
}

function Loading({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 4500); // Wait 4.5s then go next
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="z-10 flex flex-col items-center justify-center p-8 gap-12"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-pink-light animate-pulse">
        Preparing your surprise...
      </h2>
      <div className="flex gap-8 items-end justify-center h-32">
        {/* Doll */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, rotate: [-5, 5, -5] }}
          transition={{ delay: 0.5, duration: 0.5, rotate: { repeat: Infinity, duration: 2 } }}
          className="text-6xl drop-shadow-xl"
        >
          🧸
        </motion.div>

        {/* Cake */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ delay: 1.5, duration: 0.5, scale: { repeat: Infinity, duration: 1.5 } }}
          className="text-7xl z-10 drop-shadow-xl"
        >
          🎂
        </motion.div>

        {/* Cat */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, x: [0, 5, -5, 0] }}
          transition={{ delay: 2.5, duration: 0.5, x: { repeat: Infinity, duration: 0.8 } }}
          className="text-6xl drop-shadow-xl"
        >
          🐱
        </motion.div>
      </div>

      {/* Loading bar */}
      <div className="w-64 h-2 bg-pink-soft rounded-full overflow-hidden mt-8 shadow-inner border border-pink-100 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-pink-light to-pink-primary absolute left-0 top-0"
        />
      </div>
    </motion.div>
  );
}

function Wishes({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    { text: "Happy Level Up Day!\nSemoga harimu penuh kebahagiaan dan senyum manis. 🥳", color: "bg-[#bde0fe]", rotation: -2, icon: "🐱" }, // Pastel Blue
    { text: "Terima kasih sudah menjadi orang yang luar biasa!\nJangan lupa senyum hari ini! ✨", color: "bg-[#ffc8dd]", rotation: 3, icon: "😺" }, // Pastel Pink
    { text: "Semoga semua memori, harapan, dan mimpimu satu per satu bisa tercapai. 🌟", color: "bg-[#fcf6bd]", rotation: -1, icon: "😸" }, // Pastel Yellow
    { text: "Tetap jadi dirimu sendiri yang menggemaskan!\nYou are loved by many! 🥰", color: "bg-[#d8f3dc]", rotation: 4, icon: "😻" }, // Pastel Green
    { text: "Enjoy your special day to the fullest!\nSekali lagi, Happy Birthday! ❤️", color: "bg-[#e8ccbf]", rotation: -3, icon: "😽" }, // Pastel Muted Orange/Brown
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
      className="z-10 flex flex-col items-center justify-center p-4 w-full h-full"
    >
      <div className="relative w-80 h-80">
        <AnimatePresence>
          {messages.map((msg, index) => {
            if (index < currentIndex) return null; // Discarded notes

            const isTop = index === currentIndex;
            const stackedOffset = index - currentIndex;

            return (
              <motion.div
                key={index}
                className={`absolute inset-0 rounded-md border-4 border-slate-800 p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-[8px_8px_0_rgba(0,0,0,0.1)] ${msg.color}`}
                initial={false}
                animate={{
                  top: stackedOffset * 8, // Stack notes downwards
                  right: -stackedOffset * 6,
                  scale: 1 - stackedOffset * 0.04,
                  rotate: isTop ? msg.rotation : msg.rotation + (stackedOffset * 1.5),
                  zIndex: messages.length - index
                }}
                exit={{ x: -300, y: 50, opacity: 0, rotate: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={isTop ? handleNextNote : undefined}
                whileHover={isTop ? { scale: 1.02 } : {}}
              >
                {/* Paperclip */}
                <Paperclip className="absolute -top-6 right-6 w-10 h-10 text-slate-800 drop-shadow-sm stroke-[3]" />

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
                    className="absolute -top-10 left-4 text-5xl drop-shadow-md z-40"
                  >
                    {msg.icon}
                  </motion.div>
                )}

                <p className="font-bold text-slate-800 text-xl leading-relaxed whitespace-pre-wrap mt-2 z-10">
                  {msg.text}
                </p>

                {isTop && (
                  <p className="absolute bottom-4 text-xs font-extrabold text-slate-600 animate-pulse uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">
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
