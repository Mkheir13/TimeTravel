import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
              <span className="text-xl font-bold text-amber-500">TimeTravel Agency</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour des voyages temporels inoubliables.
              Explorez les époques avec sécurité et élégance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@timetravel.agency</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Horaires</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Lundi - Vendredi: 9h - 18h</p>
              <p>Samedi: 10h - 16h</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-900/30 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 TimeTravel Agency. Tous droits réservés dans toutes les époques.</p>
        </div>
      </div>
    </footer>
  );
}
