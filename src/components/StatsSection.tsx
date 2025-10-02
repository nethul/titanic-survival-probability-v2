import { useEffect, useState } from 'react';

interface StatsSectionProps {
  totalChecks: number;
}

export default function StatsSection({ totalChecks }: StatsSectionProps) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = totalChecks / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalChecks) {
        setDisplayCount(totalChecks);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalChecks]);

  return (
    <section className="bg-[#f5ead6] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-baseline space-x-3">
          <h2 className="text-5xl md:text-6xl font-serif text-[#2a2117]">
            {displayCount.toLocaleString()}
          </h2>
          <p className="text-xl md:text-2xl text-[#3a2f23]">
            people checked their survival chance
          </p>
        </div>
      </div>
    </section>
  );
}
