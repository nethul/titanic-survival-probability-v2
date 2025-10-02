import { CheckCircle, XCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
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
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareMessage = `I just discovered my Titanic survival rate would be ${probability}%! 🚢 Think you'd survive? Test yours now!`;
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(shareUrl);

    let shareLink = '';

    switch(platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
        return;
    }

    window.open(shareLink, '_blank');
    setShowShareMenu(false);
  };

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

        {/* Share Section */}
        <div className="bg-gradient-to-r from-[#d4a574] to-[#c89560] rounded-2xl p-8 mb-8 border-2 border-[#b8894f] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <p className="text-2xl font-serif text-white mb-3 font-bold">
              Compare Your Survival Rate with Friends!
            </p>
            <p className="text-white/90 mb-6 text-lg">
              Share your result and challenge others to test their fate
            </p>

            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="bg-white hover:bg-gray-50 text-[#7a6550] px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto transform hover:scale-105"
            >
              <Share2 size={24} />
              Share My Result
            </button>

            {showShareMenu && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-xl">
                <p className="text-[#2a2117] font-medium mb-4">Share via:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>

                  <button
                    onClick={() => handleShare('facebook')}
                    className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="bg-[#1DA1F2] hover:bg-[#1a94da] text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </button>

                  <button
                    onClick={() => handleShare('linkedin')}
                    className="bg-[#0A66C2] hover:bg-[#095196] text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>

                  <button
                    onClick={() => handleShare('copy')}
                    className="col-span-2 bg-[#7a6550] hover:bg-[#6b5642] text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

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