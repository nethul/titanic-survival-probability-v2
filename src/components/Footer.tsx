import { Heart, Anchor, ExternalLink, Github, Linkedin, Twitter, Mail, Network } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2a2117] text-[#e8dcc4] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-[#d4a574]" size={24} />
              <h3 className="text-2xl font-serif text-white">In Remembrance</h3>
            </div>
            <div className="bg-[#3a2f23]/50 rounded-lg p-6 border border-[#5a4f43]">
              <p className="text-[#d4c4a8] leading-relaxed text-sm">
                This educational project is created with deep respect for the 1,517 souls who perished in the Titanic disaster on April 15, 1912. This tool uses historical data and machine learning to explore survival patterns for educational purposes only. It is not intended to diminish the tragedy or disrespect the victims and their families. We honor their memory and the lessons learned from this historic maritime disaster.
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="text-[#d4a574]" size={24} />
              <h3 className="text-xl font-serif text-white">About This Project</h3>
            </div>
            <p className="text-[#d4c4a8] mb-4 leading-relaxed text-sm">
              An interactive educational tool that uses machine learning to analyze historical Titanic passenger data and explore the factors that influenced survival rates during one of history's most tragic maritime disasters.
            </p>
            <ul className="space-y-2 text-sm text-[#d4c4a8]">
              <li>• Built with React & Machine Learning</li>
              <li>• Data from Kaggle Titanic Dataset</li>
              <li>• Random Forest Classification Model</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">Learn More</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.encyclopedia-titanica.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#d4c4a8] hover:text-[#d4a574] transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Encyclopedia Titanica</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.kaggle.com/c/titanic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#d4c4a8] hover:text-[#d4a574] transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Kaggle Titanic Dataset</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.rmg.co.uk/titanic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#d4c4a8] hover:text-[#d4a574] transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Royal Museums Greenwich</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.titanicfacts.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#d4c4a8] hover:text-[#d4a574] transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Titanic Facts & History</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
            <Network className="text-[#d4a574]" size={24} />
            <h3 className="text-xl font-serif text-white">Connect</h3>
            </div>
            <p className="text-[#d4c4a8] mb-4">Created by Nethul Nanayakkara</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/nethul"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3a2f23] hover:bg-[#5a4f43] p-3 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} className="text-[#d4c4a8]" />
              </a>
              <a
                href="https://www.linkedin.com/in/nethul-nanayakkara-8214b0355/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3a2f23] hover:bg-[#5a4f43] p-3 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-[#d4c4a8]" />
              </a>
              {/* <a
                href="https://twitter.com/nethulnanayakkara"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3a2f23] hover:bg-[#5a4f43] p-3 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-[#d4c4a8]" />
              </a> */}
              <a
                href="mailto:nethulnanayakkara2005@gmail.com"
                className="bg-[#3a2f23] hover:bg-[#5a4f43] p-3 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail size={20} className="text-[#d4c4a8]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#5a4f43] pt-8 text-center">
          <p className="text-[#d4c4a8] mb-2">
            © 2025 Nethul Nanayakkara. All rights reserved.
          </p>
          <p className="text-[#d4c4a8] flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-[#d4a574] fill-[#d4a574]" /> for tech enthusiasts and history buffs.
          </p>
        </div>
      </div>
    </footer>
  );
}
