import { useState } from 'react';
import { Menu, X, Clock } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Clock className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold text-amber-500">TimeTravel Agency</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
              Accueil
            </button>
            <button onClick={() => scrollToSection('destinations')} className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
              Destinations
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-amber-500 transition-colors duration-300">
              À propos
            </button>
            <button onClick={() => scrollToSection('booking')} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
              Réserver
            </button>
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-amber-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-amber-900/30">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
              Accueil
            </button>
            <button onClick={() => scrollToSection('destinations')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
              Destinations
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
              À propos
            </button>
            <button onClick={() => scrollToSection('booking')} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full transition-all duration-300 text-left">
              Réserver
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
