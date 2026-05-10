export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--goblin-dark)] via-[var(--goblin-swamp)]/20 to-transparent opacity-80" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] text-2xl opacity-20 drip">🧪</div>
        <div className="absolute top-32 right-[15%] text-xl opacity-15 drip" style={{ animationDelay: "0.5s" }}>💀</div>
        <div className="absolute top-16 left-[60%] text-lg opacity-10 drip" style={{ animationDelay: "1s" }}>🍄</div>
        <div className="absolute top-40 left-[30%] text-xl opacity-15 drip" style={{ animationDelay: "1.5s" }}>🪙</div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Logo / Title */}
        <div className="space-y-2">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter gradient-text">
            GOBLINIFY
          </h1>
          <div className="w-20 h-20 md:w-28 md:h-28 mx-auto">
            <img src="/favicon.png" alt="Goblin" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(74,222,32,0.4)]" />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Upload your photo. Get <span className="text-[var(--goblin-accent)] font-bold">goblinified</span>.
          <br />
          <span className="text-gray-500 text-lg">AI-powered human-to-goblin transformation</span>
        </p>

        {/* CTA */}
        <a
          href="#upload"
          className="inline-block px-8 py-4 bg-[var(--goblin-green)] hover:bg-[var(--goblin-accent)] hover:text-black
                     rounded-2xl text-lg font-bold transition-all duration-300 
                     hover:scale-105 hover:shadow-lg hover:shadow-[var(--goblin-accent)]/30 swamp-glow"
        >
          🧌 Transform Me Into a Goblin
        </a>

        {/* Stats */}
        <div className="flex justify-center gap-8 pt-4 text-gray-500 text-sm">
          <span>100% Goblin Guarantee</span>
          <span>•</span>
          <span>No Humans Left Behind</span>
          <span>•</span>
          <span>Swamp Approved</span>
        </div>
      </div>
    </section>
  );
}
