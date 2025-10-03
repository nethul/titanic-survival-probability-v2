import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function StatsSection() {
  const [totalChecks, setTotalChecks] = useState(1042157);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const fetchTotalSubmissions = async () => {
      const { count } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true });

      if (count !== null) {
        setTotalChecks(1042157 + count);
      }
    };

    fetchTotalSubmissions();
  }, []);

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
