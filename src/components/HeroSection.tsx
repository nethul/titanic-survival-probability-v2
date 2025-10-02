interface HeroSectionProps {
  onCheckSurvival: () => void;
}

export default function HeroSection({ onCheckSurvival }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/Generated Image October 01, 2025 - 10_10AM.png')`,
          filter: 'sepia(0.3)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5ead6]/60 via-[#f5ead6]/40 to-[#f5ead6]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-left">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#2a2117] mb-8 leading-tight">
          Would you have survived the Titanic?
        </h1>

        <p className="text-lg md:text-xl text-[#3a2f23] mb-8 max-w-xl leading-relaxed">
          The Titanic, a British passenger liner, sank in the North Atlantic Ocean on April 15, 1912, after striking an iceberg. Of the 2,224 passengers and crew aboard, more than 1500 lost their lives in one of the deadliest commercial maritime disasters in modern history.
        </p>

        <button
          onClick={onCheckSurvival}
          className="bg-[#7a6550] hover:bg-[#6b5642] text-white px-10 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl"
        >
          Check Your Survival Chance
        </button>
      </div>
    </section>
  );
}
