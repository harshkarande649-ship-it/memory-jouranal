import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Coffee, 
  Camera, 
  BookOpen, 
  Palette, 
  Cat, 
  Music, 
  Moon, 
  Sun,
  Star,
  Cloud,
  PenTool,
  Send
} from 'lucide-react';

// --- Assets & Styles ---

// Tape Effect Component
const Tape = ({ className = "" }) => (
  <div className={`absolute h-8 w-24 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 transform ${className}`} style={{ zIndex: 10 }}></div>
);

// Sticker Component
const Sticker = ({ children, className = "", rotation = "rotate-0" }) => (
  <div className={`absolute flex items-center justify-center p-2 bg-white rounded-full border-2 border-purple-200 shadow-md transform hover:scale-110 transition-transform duration-300 ${rotation} ${className}`}>
    {children}
  </div>
);

// Polaroid Frame Component
const Polaroid = ({ title, date, children, rotation = "rotate-2" }) => (
  <div className={`bg-white p-3 pb-8 shadow-lg transform transition-transform duration-500 hover:scale-105 hover:rotate-0 ${rotation} max-w-sm mx-auto relative`}>
    <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
    <div className="bg-gray-100 aspect-square overflow-hidden mb-3 relative flex items-center justify-center text-purple-300">
      {children}
    </div>
    <div className="font-handwriting text-xl text-gray-700 text-center">{title}</div>
    {date && <div className="font-handwriting text-sm text-gray-400 text-center mt-1">{date}</div>}
  </div>
);

// Section Wrapper
const Section = ({ title, children, id }) => (
  <section id={id} className="min-h-screen flex flex-col justify-center py-20 px-6 relative">
    {title && (
      <div className="mb-12 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-handwriting text-purple-800 inline-block relative px-8 py-2">
          {title}
          <div className="absolute bottom-0 left-0 w-full h-3 bg-purple-200/50 -rotate-1 -z-10 rounded-sm"></div>
        </h2>
      </div>
    )}
    <div className="max-w-4xl mx-auto w-full relative z-10">
      {children}
    </div>
  </section>
);

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  
  // Audio ref (using a placeholder for logic, actual audio would need a source)
  const audioRef = useRef(null);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // In a real app: if (isPlaying) audioRef.current.pause() else audioRef.current.play();
  };

  // Google Font Import
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Caveat:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    // Optional: auto-play music on enter if desired
    // setIsPlaying(true);
  };

  // Content for "Things I Never Said"
  const hiddenNotes = [
    {
      id: 1,
      title: "I'm sorry regarding...",
      content: "I realize now that I should have been more patient when you were overwhelmed. I let my own anxiety speak louder than my support for you."
    },
    {
      id: 2,
      title: "I wish I had told you...",
      content: "That even on the quiet days, just sitting next to you was enough. I didn't need grand gestures, I just needed your presence."
    },
    {
      id: 3,
      title: "Thank you for...",
      content: "Teaching me that it's okay to be vulnerable. You showed me parts of myself I was scared to look at."
    }
  ];

  if (!entered) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-6 text-center font-handwriting relative overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="bg-white/80 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white max-w-md w-full relative z-10">
          <Lock className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl text-purple-900 mb-2 font-bold">Private Journal</h1>
          <p className="text-xl text-purple-600 mb-8">This page is for my heart only.</p>
          
          <button 
            onClick={handleEnter}
            className="group relative px-8 py-3 bg-purple-600 text-white rounded-full text-xl shadow-lg hover:bg-purple-700 transition-all hover:scale-105 focus:outline-none"
          >
            Enter
            <span className="absolute -inset-1 rounded-full border border-purple-300 opacity-0 group-hover:opacity-100 animate-ping"></span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 min-h-screen font-handwriting text-gray-800 overflow-x-hidden selection:bg-purple-200">
      
      {/* --- Fixed Navigation / Controls --- */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-purple-800 font-bold text-lg">
          Quiet Memory
        </div>
        <button 
          onClick={toggleMusic}
          className="pointer-events-auto bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm hover:bg-white text-purple-800 transition-colors"
          title={isPlaying ? "Mute" : "Play Music"}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </nav>

      {/* --- Intro Section --- */}
      <Section id="intro">
        <div className="text-center relative py-20">
           {/* Stickers decorating the title */}
           <Sticker className="top-0 left-10 md:left-1/4 -rotate-12" rotation="-rotate-12">
            <Moon size={24} className="text-purple-500" />
           </Sticker>
           <Sticker className="bottom-10 right-10 md:right-1/4 rotate-12" rotation="rotate-12">
            <Star size={24} className="text-yellow-400" />
           </Sticker>

           <h1 className="text-6xl md:text-8xl font-bold text-purple-900 mb-6 drop-shadow-sm tracking-wide">
             A Quiet Memory
           </h1>
           <p className="text-2xl md:text-3xl text-purple-700 max-w-2xl mx-auto leading-relaxed">
             A collection of thoughts, moments, and things I never said out loud.
             <br/>
             <span className="text-lg text-purple-400 mt-4 block">Scroll slowly.</span>
           </p>
        </div>
      </Section>

      {/* --- How It Started (Timeline) --- */}
      <Section title="How It Started" id="timeline">
        <div className="relative border-l-4 border-purple-200 ml-4 md:ml-1/2 space-y-12 pl-8 md:pl-0">
          
          {/* Timeline Item 1 */}
          <div className="relative md:w-1/2 md:ml-auto md:pl-12 group">
             <div className="absolute top-0 -left-[42px] md:-left-[18px] w-8 h-8 bg-purple-400 rounded-full border-4 border-white shadow-md z-10 group-hover:scale-110 transition-transform"></div>
             <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100 rotate-1 hover:rotate-0 transition-transform duration-300 relative">
               <Tape className="-top-3 left-4 -rotate-3" />
               <span className="text-sm text-purple-400 font-bold block mb-2">The Beginning</span>
               <h3 className="text-2xl font-bold text-gray-700 mb-2">When we first talked...</h3>
               <p className="text-xl leading-relaxed text-gray-600">
                 It wasn't a grand moment. Just a simple conversation that felt like it had been waiting to happen for years. I remember thinking, "Oh, there you are."
               </p>
             </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative md:w-1/2 md:mr-auto md:text-right md:pr-12 group">
             <div className="absolute top-0 -left-[42px] md:-right-[18px] md:left-auto w-8 h-8 bg-pink-400 rounded-full border-4 border-white shadow-md z-10 group-hover:scale-110 transition-transform"></div>
             <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100 -rotate-1 hover:rotate-0 transition-transform duration-300 relative text-left">
               <Tape className="-top-3 right-4 rotate-3" />
               <span className="text-sm text-pink-400 font-bold block mb-2">The Middle</span>
               <h3 className="text-2xl font-bold text-gray-700 mb-2">What I admired...</h3>
               <p className="text-xl leading-relaxed text-gray-600">
                 The way you looked at the world. You found beauty in things most people walked right past. It made me want to slow down too.
               </p>
             </div>
          </div>

        </div>
      </Section>

      {/* --- Digital Scrapbook (Based on the Image) --- */}
      <Section title="Pieces of Me" id="scrapbook">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: The recreated handwritten note */}
          <div className="relative bg-[#f8f5ff] p-8 shadow-xl rotate-[-2deg] max-w-md mx-auto min-h-[500px] border border-gray-100">
             {/* Torn paper effect top */}
             <div className="absolute -top-4 left-0 w-full h-8 bg-[#f8f5ff]" style={{ clipPath: "polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)" }}></div>
             <Tape className="-top-2 left-1/2 -translate-x-1/2" />
             
             <div className="flex items-center justify-between mb-6">
                <Heart className="text-purple-400 fill-purple-400" size={24} />
                <h3 className="text-5xl font-bold text-purple-600 font-[Caveat]">Me</h3>
                <div className="w-8"></div>
             </div>

             <div className="space-y-3 text-xl text-gray-700 font-[Caveat]">
               <div className="flex items-center gap-3">
                 <span className="text-purple-500">•</span>
                 <span>roses/flowers</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-purple-500">•</span>
                 <span>Armaan Malik</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-purple-500">•</span>
                 <span>Long drives</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-purple-500">•</span>
                 <span>Chanel candles</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-purple-500">•</span>
                 <span>Spending time with people</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-purple-500">•</span>
                 <span>Cats (Simba <Cat size={16} className="inline ml-1 mb-1"/>)</span>
               </div>
             </div>
             
             {/* Arrow connecting to right side list */}
             <div className="absolute top-20 right-8 text-pink-400 animate-bounce">
                <svg width="40" height="40" viewBox="0 0 50 50">
                  <path d="M10,10 Q30,20 20,40" fill="none" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>
             </div>

             {/* Right side list simulation */}
             <div className="absolute top-16 -right-2 w-48 text-right space-y-2 text-lg text-gray-800 font-[Caveat] translate-x-4">
                <p>diy cute stuff</p>
                <p>Cold coffee <Coffee size={16} className="inline"/></p>
                <p>Food</p>
                <p>Taking pictures</p>
                <p>Skincare</p>
             </div>

             <div className="mt-8 border-t-2 border-dashed border-purple-200 pt-4 relative">
                <div className="absolute -top-6 right-10 bg-white p-2 shadow-md rotate-6 rounded-md border border-purple-100">
                    <div className="text-purple-600 text-center text-xs font-bold leading-tight">
                        She Believed<br/>She Could<br/>So She Did...
                    </div>
                </div>
                <ul className="text-lg space-y-2 ml-4">
                    <li className="flex items-center gap-2">- Atomic habits</li>
                    <li className="flex items-center gap-2">- Mindset</li>
                    <li className="flex items-center gap-2">- Power</li>
                    <li className="flex items-center gap-2">- Surrounded by idiots</li>
                    <li className="flex items-center gap-2 text-purple-500">top fav books ♡</li>
                </ul>
             </div>
          </div>

          {/* Right: Floating Stickers & Polaroids */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            
            <Polaroid title="Simba" date="Always watching" rotation="rotate-6">
                <Cat size={64} />
            </Polaroid>

            {/* Floating Elements */}
            <Sticker className="-top-10 left-10 rotate-12" rotation="rotate-12">
                <Camera className="text-blue-400" size={20} />
            </Sticker>
            <Sticker className="bottom-20 -left-4 -rotate-6" rotation="-rotate-6">
                <BookOpen className="text-pink-400" size={24} />
            </Sticker>
            <Sticker className="top-20 right-0 rotate-45" rotation="rotate-45">
                <Palette className="text-green-400" size={22} />
            </Sticker>
            
            <div className="absolute bottom-0 right-10 bg-white p-4 rounded-lg shadow-lg rotate-3 border-2 border-purple-200">
                <p className="font-bold text-purple-500 text-center leading-tight">
                    MAKE IT<br/>HAPPEN
                </p>
            </div>
          </div>

        </div>
      </Section>

      {/* --- Things I Never Said (Expandable) --- */}
      <Section title="Things I Never Said" id="secrets">
        <p className="text-center text-xl text-gray-500 mb-8 italic">Click to read...</p>
        <div className="space-y-4">
          {hiddenNotes.map((note) => (
            <div key={note.id} className="max-w-2xl mx-auto">
              <button
                onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                className={`w-full text-left p-6 rounded-xl shadow-sm transition-all duration-300 border-2 ${
                  expandedNote === note.id 
                    ? 'bg-purple-50 border-purple-300' 
                    : 'bg-white border-white hover:border-purple-100'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-700">{note.title}</span>
                  {expandedNote === note.id ? <ChevronUp className="text-purple-400"/> : <ChevronDown className="text-purple-300"/>}
                </div>
                
                {expandedNote === note.id && (
                  <div className="mt-4 pt-4 border-t border-purple-100 animate-fadeIn">
                    <p className="text-xl text-gray-600 leading-relaxed">{note.content}</p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* --- What I Learned --- */}
      <Section title="What I Learned" id="growth">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Patience", icon: <Cloud className="text-blue-400" />, desc: "Good things take time. Healing takes even longer. And that is okay." },
                { title: "Space", icon: <Moon className="text-purple-400" />, desc: "Respecting distance is a form of love. Holding on too tight only pushes away." },
                { title: "Self", icon: <Heart className="text-pink-400" />, desc: "I found parts of myself I had lost. I'm painting again. I'm reading again." }
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-200 transition-all hover:-translate-y-2 group">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-50 transition-colors">
                        {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">{item.title}</h3>
                    <p className="text-center text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* --- If We Ever Talk Again --- */}
      <Section title="If We Ever Talk Again" id="future">
        <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl shadow-sm border border-white max-w-3xl mx-auto text-center relative">
            <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-1" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <p className="text-xl text-gray-700">I'd listen better.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <p className="text-xl text-gray-700">I'd be calmer.</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <p className="text-xl text-gray-700">No pressure.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <p className="text-xl text-gray-700">Just honesty.</p>
                    </div>
                </div>
            </div>
            <p className="mt-8 text-purple-400 text-lg">We grow, we learn, we move forward.</p>
        </div>
      </Section>

      {/* --- Letting Go --- */}
      <Section id="letter">
        <div className="relative max-w-2xl mx-auto mt-10">
            {/* Envelope Top */}
            <div className="bg-white p-12 md:p-16 shadow-2xl relative z-10 rotate-1 border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>
                
                <div className="font-[Caveat] text-3xl md:text-4xl text-gray-800 leading-loose">
                    <p className="mb-8">To You,</p>
                    <p className="mb-8">
                        If you ever read this someday... I hope you're happy. 
                        Truly happy. That matters more than anything we went through.
                    </p>
                    <p className="mb-8">
                        I care. But I also respect your space. 
                        And I'm learning to be okay on my own.
                    </p>
                    <p className="text-right mt-12">- Me</p>
                </div>
            </div>
            
            {/* Decorative background paper */}
            <div className="absolute inset-0 bg-purple-200 transform -rotate-2 z-0 rounded-lg translate-y-2 translate-x-2"></div>
        </div>
        
        <div className="text-center mt-24 mb-10 opacity-50">
            <Send className="mx-auto mb-2 text-purple-300" size={24} />
            <p className="text-sm text-purple-400">Sent to the universe.</p>
        </div>
      </Section>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .font-handwriting {
          font-family: 'Patrick Hand', cursive;
        }
      `}</style>

    </div>
  );
}
