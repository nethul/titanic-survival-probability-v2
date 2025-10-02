import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsPageProps {
  survived: boolean;
  probability: number;
  name: string;
  onReset: () => void;
}

export default function ResultsPage({ survived, probability, name, onReset }: ResultsPageProps) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5ead6] to-[#e8dcc4] flex items-center justify-center px-6 pt-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          {survived ? (
            <CheckCircle className="w-32 h-32 text-green-600 mx-auto mb-6" />
          ) : (
            <XCircle className="w-32 h-32 text-red-600 mx-auto mb-6" />
          )}
        </div>

        <h1 className="text-5xl md:text-6xl font-serif text-[#2a2117] mb-6">
          {survived ? `${name}, You Would Have Survived!` : `${name}, You Would Not Have Survived`}
        </h1>

        <div className="bg-white/60 rounded-2xl p-8 mb-8 border-2 border-[#d4c4a8]">
          <p className="text-3xl font-serif text-[#2a2117] mb-2">Survival Probability</p>
          <p className="text-6xl font-bold text-[#7a6550]">{probability}%</p>
        </div>

        <p className="text-lg text-[#3a2f23] mb-8 leading-relaxed">
          {survived
            ? 'Based on your characteristics, statistical models suggest you had a higher chance of survival during the Titanic disaster. Factors like gender, age, and passenger class played significant roles in survival rates.'
            : 'Based on your characteristics, statistical models suggest you had a lower chance of survival during the Titanic disaster. Factors like gender, age, and passenger class played significant roles in survival rates.'}
        </p>

        <button
          onClick={onReset}
          className="bg-[#7a6550] hover:bg-[#6b5642] text-white px-10 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl"
        >
          Check Another Person
        </button>
      </div>
    </section>
  );
}
