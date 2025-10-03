import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import SurvivalForm from './components/SurvivalForm';
import ResultsPage from './components/ResultsPage';
import Footer from './components/Footer';
import FactsSlideshow from './components/FactsSlideshow';

interface FormData {
  name: string;
  gender: string;
  age: number;
  ticketClass: number;
  parents: number;
  children: number;
  siblings: number;
  spouse: number;
}

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'check') {
      const formSection = document.querySelector('form');
      formSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckSurvival = () => {
    const formSection = document.querySelector('form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (data: FormData) => {
    navigate('/results', { state: data });
  };

  return (
    <div className="min-h-screen bg-[#f5ead6]">
      <Navbar onNavigate={handleNavigate} />
      <HeroSection onCheckSurvival={handleCheckSurvival} />
      <StatsSection />
      <SurvivalForm onSubmit={handleFormSubmit} />
      <FactsSlideshow />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
