import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import SurvivalForm from './components/SurvivalForm';
import ResultsPage from './components/ResultsPage';
import { supabase } from './lib/supabase';
import { calculateSurvival } from './utils/survivalCalculator';

interface FormData {
  name: string;
  gender: string;
  age: number;
  ticketClass: number;
  parents: number;
  children: number;
  siblings: number;
  spouse : number;
}

function App() {
  const [showResults, setShowResults] = useState(false);
  const [totalChecks, setTotalChecks] = useState(1042157);
  const [result, setResult] = useState<{
    survived: boolean;
    probability: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetchTotalSubmissions();
  }, []);

  const fetchTotalSubmissions = async () => {
    const { count } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true });

    if (count !== null) {
      setTotalChecks(1042157 + count);
    }
  };

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      setShowResults(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'check') {
      setShowResults(false);
      const formSection = document.querySelector('form');
      formSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckSurvival = () => {
    const formSection = document.querySelector('form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: FormData) => {
    const survivalResult = calculateSurvival({
      gender: data.gender,
      age: data.age,
      ticketClass: data.ticketClass,
      parents: data.parents,
      children: data.children,
      siblings: data.siblings,
      spouse : data.spouse,
    });

    await supabase.from('submissions').insert([{
      name: data.name,
      gender: data.gender,
      age: data.age,
      ticket_class: data.ticketClass,
      parents: data.parents,
      children: data.children,
      siblings: data.siblings,
      survived: survivalResult.survived,
      probability: survivalResult.probability,
    }]);

    setResult({
      ...survivalResult,
      name: data.name,
    });
    setShowResults(true);
    await fetchTotalSubmissions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setShowResults(false);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5ead6]">
      <Navbar onNavigate={handleNavigate} />

      {showResults && result ? (
        <ResultsPage
          survived={result.survived}
          probability={result.probability}
          name={result.name}
          onReset={handleReset}
        />
      ) : (
        <>
          <HeroSection onCheckSurvival={handleCheckSurvival} />
          <StatsSection totalChecks={totalChecks} />
          <SurvivalForm onSubmit={handleFormSubmit} />
        </>
      )}
    </div>
  );
}

export default App;
