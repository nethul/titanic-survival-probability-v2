import { Anchor } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#f5ead6]/95 backdrop-blur-sm z-50 border-b border-[#d4c4a8]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Anchor className="w-6 h-6 text-[#6b5d4f]" />
            <span className="text-2xl font-serif text-[#3a2f23]">Titanic</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-[#3a2f23] hover:text-[#6b5d4f] transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('details')}
              className="text-[#3a2f23] hover:text-[#6b5d4f] transition-colors font-medium"
            >
              Titanic Ship Details
            </button>
            <button
              onClick={() => onNavigate('stories')}
              className="text-[#3a2f23] hover:text-[#6b5d4f] transition-colors font-medium"
            >
              Stories of Survivors
            </button>
            <button
              onClick={() => onNavigate('check')}
              className="text-[#3a2f23] hover:text-[#6b5d4f] transition-colors font-medium"
            >
              Check Survival
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
