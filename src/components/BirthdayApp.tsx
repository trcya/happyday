"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, ChevronRight, ChevronLeft, Gift, Paperclip } from "lucide-react";

// Steps: 0 = Landing, 1 = Greeting, 2 = Gallery, 3 = Wishes, 4 = Credits

export default function BirthdayApp() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => s + 1);

  return (
    <div className="relative min-h-screen w-full bg-white text-pink-primary overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-pink-light selection:text-white">
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
  const [sparkles, setSparkles] = useState<{ x: string; y: string; scale: number; duration: number }[]>([]);

  useEffect(() => {
    setSparkles([...Array(15)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + 2,
    })));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="z-10 flex flex-col items-center gap-12 relative w-full h-full min-h-screen justify-center overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-50 via-white to-pink-50"
    >
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-30"
            initial={{ x: s.x, y: s.y, scale: s.scale }}
            animate={{ 
              y: [null, "-40px", "40px", "0px"],
              rotate: [0, 45, -45, 0],
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut" }}
          >
            {i % 3 === 0 ? <Heart size={24} fill="currentColor" /> : <Stars size={24} />}
          </motion.div>
        ))}
      </div>

      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
        className="z-20 text-center"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-primary via-pink-400 to-pink-primary bg-[length:200%_auto] animate-gradient-x max-w-2xl drop-shadow-md px-4"
          style={{ lineHeight: 1.2 }}
        >
          {isOpen ? "A Lifetime of Happiness..." : "A Special Surprise Awaits!"}
        </motion.h1>
        {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-pink-primary/40 mt-4 font-bold tracking-[0.5em] uppercase text-[10px]"
          >
            Press the seal to begin
          </motion.p>
        )}
      </motion.div>

      <motion.div 
        className="relative w-80 h-52 cursor-pointer z-30 group mt-20"
        style={{ perspective: "1500px" }}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {/* Soft Aura Glow */}
        <div className="absolute -inset-20 bg-pink-primary/10 rounded-full blur-[120px] group-hover:bg-pink-primary/20 transition-all duration-1000" />
        
        {/* ENVELOPE BACK WALL */}
        <div className="absolute inset-0 bg-pink-600 rounded-2xl shadow-xl overflow-hidden border border-pink-700/20">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] bg-[length:15px_15px]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-700/20 to-transparent" />
        </div>
        
        {/* THE LETTER (Fully hidden inside initially) */}
        <motion.div 
          className="absolute inset-x-4 bg-[#fffefc] rounded-xl p-8 flex flex-col items-center justify-start gap-4 shadow-2xl border border-pink-50 z-10"
          style={{ height: "240px", bottom: "10px" }}
          initial={{ y: 240, opacity: 0 }}
          animate={isOpen ? { y: -200, opacity: 1, scale: 1.05, rotate: -1 } : { y: 240, opacity: 0 }}
          transition={{ 
            y: { delay: isOpen ? 0.6 : 0, type: "spring", stiffness: 70, damping: 14 },
            opacity: { delay: isOpen ? 0.6 : 0 },
            scale: { delay: isOpen ? 0.6 : 0 },
            rotate: { delay: isOpen ? 0.6 : 0 }
          }}
          whileHover={isOpen ? { scale: 1.08, rotate: 0, y: -210 } : {}}
          onClick={(e) => { if (isOpen) { e.stopPropagation(); onNext(); } }}
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')] rounded-xl" />
          
          {/* Letter Stamp */}
          <div className="absolute top-4 right-4 w-10 h-12 bg-white/90 border-2 border-dashed border-pink-50 flex items-center justify-center rotate-12 shadow-sm">
             <Heart size={18} className="text-pink-primary fill-pink-primary opacity-20" />
          </div>
          
          <div className="text-center relative z-10 mt-4 h-full flex flex-col items-center">
            <p className="text-pink-primary font-black text-3xl italic font-serif tracking-tighter mb-4 leading-none" style={{ lineHeight: 1.2 }}>
              Hello,<br/>Special One!
            </p>
            
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="mb-4">
              <Heart className="w-14 h-14 text-pink-primary fill-pink-primary drop-shadow-[0_8px_15px_rgba(255,20,147,0.15)]" />
            </motion.div>

            <div className="mt-auto bg-pink-50/50 px-5 py-2 rounded-full border border-pink-100/50 flex flex-col items-center">
               <p className="text-[8px] text-pink-primary font-black tracking-[0.4em] uppercase opacity-40">Invitation</p>
               <p className="text-[7px] text-pink-300 font-bold uppercase animate-pulse">Tap to Open</p>
            </div>
          </div>
        </motion.div>

        {/* ENVELOPE FRONT-SIDE FLAPS (Clipped to cover the letter) */}
        <div 
          className="absolute inset-0 bg-pink-500 rounded-2xl z-[5] pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]" 
          style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }} 
        />
        
        {/* ENVELOPE TOP FLAP */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[60%] origin-top z-30"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 30 }}
          transition={{ rotateX: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FLAP FRONT (The Triangle) */}
          <div 
            className="absolute inset-0 bg-pink-400 rounded-t-2xl flex items-end justify-center pb-8 shadow-xl" 
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
          >
            {/* The Seal Button */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(220,38,38,0.4)] border-4 border-red-700/50 cursor-pointer relative z-50 transform translate-y-8"
            >
              <Heart size={28} className="text-white fill-white animate-pulse" />
            </motion.div>
          </div>
          
          {/* FLAP BACK (Colored pink-100 for contrast) */}
          <div 
            className="absolute inset-0 bg-pink-100 rounded-t-2xl shadow-inner" 
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
          >
             <div className="w-full h-full opacity-10 bg-[radial-gradient(#db2777_1px,transparent_1px)] [background-size:12px_12px]" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ opacity: [0.3, 0.8, 0.3] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-8 z-20 flex flex-col items-center gap-3"
      >
        <p className="text-pink-primary font-black uppercase tracking-[0.4em] text-[10px]">{isOpen ? "Your adventure awaits..." : "Open the secret message"}</p>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-200" />)}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Greeting({ onNext }: { onNext: () => void }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; scale: number; rotate: number }[]>([]);

  const handleOpenGift = () => {
    setIsOpened(true);
    setTimeout(() => {
      setShowCake(true);
      // Generate Confetti
      const colors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#ffffff", "#ffd700"];
      const particles = [...Array(40)].map((_, i) => ({
        id: i,
        x: Math.random() * 400 - 200,
        y: Math.random() * -300 - 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 1 + 0.5,
        rotate: Math.random() * 360
      }));
      setConfetti(particles);
    }, 450);
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
              style={{ backgroundColor: p.color }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div animate={showCake ? { y: -20 } : { y: 0 }} className="space-y-3 mb-10 z-10 relative">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-primary to-pink-light tracking-tighter pb-2 drop-shadow-sm">
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
            <div className="absolute bottom-0 w-full h-[72%] bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-2xl border-2 border-pink-700/50 flex justify-center">
               <div className="w-10 h-full bg-pink-300/80 border-x-2 border-pink-400 shadow-inner" />
            </div>
            <motion.div 
               animate={isOpened ? { y: -450, rotate: 60, x: 150, opacity: 0, scale: 1.5 } : { y: [0, -6, 0] }}
               transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
               className="absolute top-2 w-[112%] left-[-6%] h-[32%] bg-pink-500 rounded-xl shadow-2xl z-20 border-2 border-pink-600 flex justify-center"
            >
               <div className="w-10 h-full bg-pink-300 border-x-2 border-pink-400" />
               <div className="absolute -top-12 flex -space-x-4">
                  <div className="w-14 h-14 bg-pink-300 rounded-full border-4 border-pink-400 rotate-45 shadow-lg" />
                  <div className="w-14 h-14 bg-pink-300 rounded-full border-4 border-pink-400 -rotate-45 shadow-lg" />
               </div>
            </motion.div>
            
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-pink-primary font-black uppercase text-[10px] tracking-widest bg-white px-6 py-2 rounded-full border-2 border-pink-primary shadow-xl">
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
    "https://images.unsplash.com/photo-1582206684807-fcf870f2f359?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop"
  ];

  const handleNext = () => setIndex((i) => (i + 1) % images.length);
  const handlePrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="z-10 flex flex-col items-center w-full max-w-sm px-6"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-8">
        <h2 className="text-4xl font-black text-pink-primary tracking-tighter mb-2">SWEET MEMORIES</h2>
        <div className="h-1.5 w-12 bg-pink-primary mx-auto rounded-full" />
      </motion.div>

      <div className="relative w-full aspect-[3/4] bg-white p-4 pb-16 rounded-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-pink-50 mb-12 flex flex-col items-center group">
        <div className="absolute inset-x-0 -top-6 flex justify-center z-20">
           <div className="w-16 h-8 bg-pink-100/40 backdrop-blur-sm border border-white/50 rounded-md shadow-sm" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -2 : 2 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            exit={{ opacity: 0, scale: 1.1, rotate: 5 }} 
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full h-full relative overflow-hidden rounded shadow-inner bg-gray-50"
          >
            <img src={images[index]} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-110" alt="Gallery" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-6 left-0 right-0 px-6 flex flex-col items-center">
          <p className="font-serif italic text-pink-light text-2xl tracking-tight">Our Memory #{index + 1}</p>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 -right-6 flex justify-between w-[calc(100%+3rem)] z-30">
          <motion.button whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }} onClick={handlePrev} className="p-4 rounded-full bg-white shadow-xl text-pink-primary cursor-pointer border border-pink-50 active:scale-95 transition-all"><ChevronLeft className="w-6 h-6" /></motion.button>
          <motion.button whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }} onClick={handleNext} className="p-4 rounded-full bg-white shadow-xl text-pink-primary cursor-pointer border border-pink-50 active:scale-95 transition-all"><ChevronRight className="w-6 h-6" /></motion.button>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05, y: -2 }} 
        whileTap={{ scale: 0.95 }} 
        onClick={onNext} 
        className="px-12 py-5 bg-black text-white rounded-full font-black shadow-2xl cursor-pointer uppercase tracking-[0.3em] text-[10px] w-full"
      >
        Keep Exploring ✨
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
                  <p className="font-black text-gray-800 text-xl sm:text-2xl md:text-3xl leading-[1.4] tracking-tight mb-8 whitespace-pre-wrap">
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
