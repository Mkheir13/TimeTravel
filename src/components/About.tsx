import { Shield, Clock, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Technologie de voyage temporel certifiée et assurée pour votre tranquillité d\'esprit.'
    },
    {
      icon: Clock,
      title: 'Précision absolue',
      description: 'Arrivez exactement à l\'époque souhaitée avec une précision à la seconde près.'
    },
    {
      icon: Award,
      title: 'Excellence reconnue',
      description: 'Agence primée pour la qualité de ses services et l\'authenticité de ses voyages.'
    },
    {
      icon: Users,
      title: 'Guides experts',
      description: 'Accompagnement par des historiens passionnés connaissant parfaitement chaque époque.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            À propos de
            <span className="text-amber-500"> TimeTravel Agency</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Pionniers du voyage temporel depuis 2089, nous vous offrons l'opportunité unique
            d'explorer les moments les plus fascinants de notre histoire avec confort et sécurité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-amber-900/30 rounded-2xl p-6 transition-all duration-300 hover:border-amber-500/50"
            >
              <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-amber-900/20 to-amber-950/20 border border-amber-900/30 rounded-3xl p-8 sm:p-12"
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Notre Mission</h3>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Rendre l'histoire vivante et accessible à tous. Nous croyons que voyager dans le temps
            n'est pas seulement une aventure, c'est une opportunité d'apprentissage et d'émerveillement.
            Chaque voyage est conçu pour offrir une expérience authentique, éducative et inoubliable,
            tout en respectant l'intégrité temporelle et la sécurité de nos voyageurs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
