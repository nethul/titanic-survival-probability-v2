import { CheckCircle, XCircle } from 'lucide-react';
import SurvivalFactorsBreakdown from './SurvivalFactorsBreakdown';

interface ResultsPageProps {
  survived: boolean;
  probability: number;
  name: string;
  formData: {
    gender: string;
    age: number;
    ticketClass: number;
    parents: number;
    children: number;
    siblings: number;
    spouse: number;
  };
  onReset: () => void;
}

export default function ResultsPage({ survived, probability, name, formData, onReset }: ResultsPageProps) {
  const getRangeInfo = () => {
    if (probability >= 80) return {
      icon: "🟢",
      title: "High Survival Likelihood",
      description: "Historical data suggests strong survival factors were present"
    };
    if (probability >= 60) return {
      icon: "🟡",
      title: "Above Average Survival Likelihood", 
      description: "Several favorable factors would have improved survival chances"
    };
    if (probability >= 40) return {
      icon: "🟠",
      title: "Uncertain Outcome",
      description: "Survival would have depended on many unpredictable circumstances"
    };
    if (probability >= 20) return {
      icon: "🔴",
      title: "Challenging Circumstances",
      description: "Historical patterns suggest survival would have been difficult"
    };
    return {
      icon: "🔴",
      title: "Very Challenging Circumstances",
      description: "Survival would have required exceptional circumstances"
    };
  };

  const rangeInfo = getRangeInfo();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5ead6] to-[#e8dcc4] flex items-center justify-center px-6 pt-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 text-8xl">
          {rangeInfo.icon}
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-[#2a2117] mb-4">
          {rangeInfo.title}
        </h1>

        <h2 className="text-2xl text-[#5a4f43] mb-8">
          Analysis for {name}
        </h2>

        <div className="bg-white/60 rounded-2xl p-8 mb-8 border-2 border-[#d4c4a8]">
          <p className="text-2xl font-serif text-[#2a2117] mb-2">Survival Probability</p>
          <p className="text-6xl font-bold text-[#7a6550]">{probability}%</p>
          <p className="text-lg text-[#3a2f23] mt-4 italic">
            {rangeInfo.description}
          </p>
        </div>

        <SurvivalFactorsBreakdown 
          userData={{
            gender: formData.gender,
            age: formData.age,
            ticketClass: formData.ticketClass,
            familySize: formData.parents + formData.children + formData.siblings + formData.spouse,
          }}
          probability={probability}
        />

        {/* <p className="text-base text-[#3a2f23] mb-8 leading-relaxed">
          This analysis is based on historical patterns from actual Titanic passenger data. 
          Factors like gender, age, and passenger class played significant roles in survival rates, 
          though individual outcomes varied greatly due to circumstances, location on the ship, 
          and many other factors.
        </p> */}

        <button
          onClick={onReset}
          className="bg-[#7a6550] hover:bg-[#6b5642] text-white px-10 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl"
        >
          Analyze Another Person
        </button>
      </div>
    </section>
  );
}