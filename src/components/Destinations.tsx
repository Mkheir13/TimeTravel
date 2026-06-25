import { MapPin, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Destination {
  id: string;
  name: string;
  period: string;
  year: string;
  description: string;
  highlights: string[];
  image: string;
  color: string;
}

export default function Destinations() {
  const base = import.meta.env.BASE_URL;
  const destinations: Destination[] = [
    {
      id: 'paris-1889',
      name: 'Paris 1889',
      period: 'Belle Époque',
      year: '1889',
      description: 'Plongez dans l\'effervescence de l\'Exposition Universelle et admirez l\'inauguration de la Tour Eiffel. Découvrez le Paris des lumières à son apogée.',
      highlights: [
        'Inauguration de la Tour Eiffel',
        'Exposition Universelle',
        'Cabarets et vie parisienne',
        'Art nouveau et impressionnisme'
      ],
      image: `${base}paris.webp`,
      color: 'from-blue-900 to-purple-900'
    },
    {
      id: 'cretaceous',
      name: 'Crétacé -65M',
      period: 'Préhistoire',
      year: '-65 000 000',
      description: 'Vivez l\'aventure ultime au temps des dinosaures. Observez les titanesques créatures dans leur habitat naturel en toute sécurité.',
      highlights: [
        'Tyrannosaures et Tricératops',
        'Forêts préhistoriques luxuriantes',
        'Volcans actifs',
        'Observation sécurisée garantie'
      ],
      image: `${base}cetace.jpg`,
      color: 'from-green-900 to-emerald-900'
    },
    {
      id: 'florence-1504',
      name: 'Florence 1504',
      period: 'Renaissance',
      year: '1504',
      description: 'Assistez à la création du David de Michel-Ange et immergez-vous dans l\'âge d\'or de la Renaissance italienne. Art, culture et génie se rencontrent.',
      highlights: [
        'Michel-Ange au travail',
        'Chefs-d\'œuvre de la Renaissance',
        'Architecture florentine',
        'Rencontres avec les Médicis'
      ],
      image: `${base}florence.jpg`,
      color: 'from-orange-900 to-red-900'
    }
  ];

  return (
    <section id="destinations" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Nos destinations
            <span className="text-amber-500"> temporelles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Trois époques extraordinaires vous attendent. Choisissez votre voyage dans le temps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-amber-900/30 rounded-2xl overflow-hidden transform transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-16 h-16 text-white/80" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold">
                    {destination.period}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.year}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                  {destination.name}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                <div className="space-y-2 mb-6">
                  {destination.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const element = document.getElementById('booking');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/50"
                >
                  Découvrir cette époque
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
