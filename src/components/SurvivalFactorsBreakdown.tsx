import { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Users, Ship, Calendar, UserCircle } from 'lucide-react';

interface UserData {
  gender: string;
  age: number;
  ticketClass: number;
  familySize: number;
}

interface SurvivalFactorsBreakdownProps {
  userData: UserData;
  probability: number;
}

export default function SurvivalFactorsBreakdown({ userData, probability }: SurvivalFactorsBreakdownProps) {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  // Add safety check
  if (!userData) {
    return null;
  }

  const factors = [
    {
      id: 'gender',
      icon: <UserCircle className="w-5 h-5" />,
      name: 'Gender',
      value: userData.gender === 'female' ? 'Female' : 'Male',
      userImpact: userData.gender === 'female' ? 'favorable' : 'unfavorable',
      importance: 'Very High',
      explanation: userData.gender === 'female' 
        ? 'Women benefited from the "women and children first" evacuation policy, resulting in significantly higher survival rates.'
        : 'Men had lower priority for lifeboats due to the "women and children first" policy, resulting in lower survival rates.',
      historicalData: 'Women: 74% survived | Men: 20% survived',
      modelNote: 'Gender was the strongest predictor in survival outcomes'
    },
    {
      id: 'class',
      icon: <Ship className="w-5 h-5" />,
      name: 'Passenger Class',
      value: `${userData.ticketClass}${userData.ticketClass === 1 ? 'st' : userData.ticketClass === 2 ? 'nd' : 'rd'} Class`,
      userImpact: userData.ticketClass === 1 ? 'favorable' : userData.ticketClass === 2 ? 'mixed' : 'unfavorable',
      importance: 'High',
      explanation: userData.ticketClass === 1
        ? 'First-class passengers had cabins closer to the boat deck and were given priority access to lifeboats. They also had better information about the emergency.'
        : userData.ticketClass === 2
        ? 'Second-class passengers had moderate access to lifeboats but faced some delays compared to first-class passengers.'
        : 'Third-class passengers faced structural barriers (locked gates), were located deeper in the ship, and received delayed evacuation instructions.',
      historicalData: '1st: 62% | 2nd: 41% | 3rd: 25% survived',
      modelNote: 'Passenger class significantly influenced access to lifeboats'
    },
    {
      id: 'age',
      icon: <Calendar className="w-5 h-5" />,
      name: 'Age',
      value: `${userData.age} years old`,
      userImpact: userData.age < 16 ? 'favorable' : userData.age > 60 ? 'unfavorable' : 'mixed',
      importance: 'Moderate',
      explanation: userData.age < 16
        ? 'Children were prioritized during evacuation as part of the "women and children first" policy.'
        : userData.age > 60
        ? 'Elderly passengers faced physical challenges during evacuation and had lower survival rates due to mobility issues.'
        : 'Adults in the middle age range had survival rates primarily determined by other factors like gender and class.',
      historicalData: 'Children: 52% | Adults: 39% | Elderly: ~30% survived',
      modelNote: 'Age influenced prioritization and physical ability to evacuate'
    },
    {
      id: 'family',
      icon: <Users className="w-5 h-5" />,
      name: 'Family Size',
      value: userData.familySize === 0 ? 'Traveling alone' : `${userData.familySize} ${userData.familySize === 1 ? 'companion' : 'companions'}`,
      userImpact: userData.familySize >= 1 && userData.familySize <= 3 ? 'favorable' : userData.familySize > 3 ? 'unfavorable' : 'mixed',
      importance: 'Moderate',
      explanation: userData.familySize === 0
        ? 'Traveling alone meant no coordination needed, but also no family support during the chaotic evacuation.'
        : userData.familySize >= 1 && userData.familySize <= 3
        ? 'Small families could coordinate evacuation together and provide mutual support, improving survival chances without logistical complications.'
        : 'Large families struggled to stay together during evacuation. Some members refused to board lifeboats without the entire family.',
      historicalData: 'Small groups (1-3) had highest survival rates',
      modelNote: 'Family size affected evacuation coordination and decision-making'
    }
  ];

  const getImpactColor = (impact: string) => {
    if (impact === 'favorable') return 'bg-green-100 border-green-400 text-green-800';
    if (impact === 'unfavorable') return 'bg-red-100 border-red-400 text-red-800';
    return 'bg-amber-100 border-amber-400 text-amber-800';
  };

  const getImpactIcon = (impact: string) => {
    if (impact === 'favorable') return '↑';
    if (impact === 'unfavorable') return '↓';
    return '→';
  };

  const getImportanceBadge = (importance: string) => {
    const colors: Record<string, string> = {
      'Very High': 'bg-purple-100 border-purple-400 text-purple-800',
      'High': 'bg-blue-100 border-blue-400 text-blue-800',
      'Moderate': 'bg-slate-100 border-slate-400 text-slate-800'
    };
    return colors[importance] || colors['Moderate'];
  };

  return (
    <div className="bg-white/60 rounded-2xl p-6 border-2 border-[#d4c4a8] mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-6 h-6 text-[#7a6550]" />
        <h3 className="text-2xl font-serif text-[#2a2117]">Factor Analysis</h3>
      </div>
      
      <p className="text-sm text-[#5a4f43] mb-6">
        The model analyzed these characteristics based on historical patterns. Click each to learn more.
      </p>

      <div className="space-y-3">
        {factors.map((factor) => (
          <div key={factor.id} className="border-2 border-[#d4c4a8] rounded-lg overflow-hidden bg-white/40">
            <button
              onClick={() => setExpandedFactor(expandedFactor === factor.id ? null : factor.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/60 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-[#7a6550]">{factor.icon}</div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-[#2a2117]">{factor.name}</div>
                  <div className="text-sm text-[#5a4f43]">{factor.value}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded text-xs font-semibold border ${getImportanceBadge(factor.importance)}`}>
                  {factor.importance}
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold border-2 ${getImpactColor(factor.userImpact)}`}>
                  {getImpactIcon(factor.userImpact)}
                </div>
                {expandedFactor === factor.id ? (
                  <ChevronUp className="w-5 h-5 text-[#7a6550]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#7a6550]" />
                )}
              </div>
            </button>

            {expandedFactor === factor.id && (
              <div className="px-4 py-4 bg-[#f5ead6]/80 border-t-2 border-[#d4c4a8]">
                <div className="mb-4">
                  <div className="text-xs text-[#7a6550] uppercase font-semibold mb-1">
                    Your Characteristic
                  </div>
                  <p className="text-[#3a2f23] leading-relaxed">
                    {factor.explanation}
                  </p>
                </div>
                
                <div className="bg-[#e8dcc4] rounded-lg p-3 border border-[#d4c4a8] mb-3">
                  <div className="text-xs text-[#5a4f43] uppercase font-semibold mb-1">
                    Historical Survival Rates
                  </div>
                  <div className="text-sm text-[#2a2117] font-semibold">
                    {factor.historicalData}
                  </div>
                </div>

                <div className="bg-[#7a6550]/10 rounded-lg p-3 border border-[#7a6550]/30">
                  <div className="text-xs text-[#6b5642] uppercase font-semibold mb-1">
                    Model Insight
                  </div>
                  <div className="text-sm text-[#2a2117]">
                    {factor.modelNote}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#7a6550]/10 rounded-lg border border-[#7a6550]/30">
        <p className="text-sm text-[#3a2f23]">
          <strong>How it works:</strong> The Random Forest model learned patterns from 891 historical Titanic passengers. 
          It considers how these factors combined for similar passengers, rather than adding fixed percentages. 
          Your {probability}% probability reflects complex interactions between all these characteristics.
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-[#5a4f43]">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          The arrows (↑↓→) indicate whether your specific value for each factor historically correlated with 
          higher, lower, or neutral survival rates. The model weighs all factors together to produce the final prediction.
        </p>
      </div>
    </div>
  );
}