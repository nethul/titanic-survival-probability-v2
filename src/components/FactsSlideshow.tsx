import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const titanicFacts = [
  {
    title: "Construction Marvel",
    fact: "The Titanic took 3 years to build and cost $7.5 million (about $200 million today). Over 3,000 workers were involved in its construction."
  },
  {
    title: "Unsinkable Ship",
    fact: "The Titanic was considered 'practically unsinkable' due to its 16 watertight compartments. However, the iceberg damaged 6 of them, which was more than the ship could survive."
  },
  {
    title: "Lifeboats Shortage",
    fact: "The Titanic carried only 20 lifeboats, enough for 1,178 people. This was actually more than legally required at the time, but far fewer than the 2,224 people on board."
  },
  {
    title: "Women and Children First",
    fact: "74% of women and 52% of children survived, while only 20% of men survived. First-class passengers had a 62% survival rate compared to just 25% for third-class passengers."
  },
  {
    title: "The Band Played On",
    fact: "The ship's band continued to play music as the Titanic sank, reportedly playing 'Nearer, My God, to Thee' or a ragtime tune to keep passengers calm. All eight musicians perished."
  },
  {
    title: "Ice Warnings Ignored",
    fact: "The Titanic received at least 6 ice warnings on the day of the collision, but continued at near-maximum speed through the ice field."
  },
  {
    title: "The Closest Ship",
    fact: "The SS Californian was only 10-20 miles away and could have rescued everyone, but its radio operator had gone to bed and never received the Titanic's distress signals."
  },
  {
    title: "Discovery",
    fact: "The wreck of the Titanic wasn't discovered until September 1, 1985, by Robert Ballard. It lies 12,500 feet below the surface of the Atlantic Ocean."
  },
  {
    title: "Millionaire's Special",
    fact: "Some of the wealthiest people in the world were aboard, including John Jacob Astor IV (worth $87 million), Benjamin Guggenheim, and Isidor and Ida Straus (owners of Macy's)."
  },
  {
    title: "Lucky Cancellations",
    fact: "J.P. Morgan, Milton Hershey, and Guglielmo Marconi all had tickets for the voyage but canceled at the last minute for various reasons."
  }
];

export default function FactsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titanicFacts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + titanicFacts.length) % titanicFacts.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % titanicFacts.length);
  };

  return (
    <section className="bg-gradient-to-b from-[#f5ead6] to-[#e8dcc4] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[#2a2117] text-center mb-12">
          Titanic Facts
        </h2>

        <div className="relative bg-white/60 rounded-2xl p-8 md:p-12 border-2 border-[#d4c4a8] shadow-lg">
          <div className="min-h-[200px] flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-serif text-[#7a6550] mb-4">
              {titanicFacts[currentIndex].title}
            </h3>
            <p className="text-lg md:text-xl text-[#3a2f23] leading-relaxed">
              {titanicFacts[currentIndex].fact}
            </p>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-[#7a6550] hover:bg-[#6b5642] text-white transition-all shadow-md hover:shadow-lg"
              aria-label="Previous fact"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {titanicFacts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#7a6550] w-8'
                      : 'bg-[#d4c4a8] hover:bg-[#b8a58a]'
                  }`}
                  aria-label={`Go to fact ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-[#7a6550] hover:bg-[#6b5642] text-white transition-all shadow-md hover:shadow-lg"
              aria-label="Next fact"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
