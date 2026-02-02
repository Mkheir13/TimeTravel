import { useState } from 'react';
import { Calendar, Users, Mail, User, Phone, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    travelers: '1',
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const destinations = [
    { value: 'paris-1889', label: 'Paris 1889 - Belle Époque', price: 8500 },
    { value: 'cretaceous', label: 'Crétacé -65M - Dinosaures', price: 15000 },
    { value: 'florence-1504', label: 'Florence 1504 - Renaissance', price: 7500 }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.destination) newErrors.destination = 'Veuillez choisir une destination';
    if (!formData.date) newErrors.date = 'Veuillez sélectionner une date';
    if (!formData.name) newErrors.name = 'Votre nom est requis';
    if (!formData.email) {
      newErrors.email = 'Votre email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone) newErrors.phone = 'Votre téléphone est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          destination: '',
          date: '',
          travelers: '1',
          name: '',
          email: '',
          phone: ''
        });
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const selectedDestination = destinations.find(d => d.value === formData.destination);
  const totalPrice = selectedDestination ? selectedDestination.price * parseInt(formData.travelers) : 0;

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-green-900/20 to-emerald-950/20 border border-green-500/30 rounded-3xl p-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Réservation confirmée !</h3>
              <p className="text-xl text-gray-300 mb-6">
                Merci {formData.name} ! Votre demande de voyage temporel a été enregistrée.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Notre équipe va étudier votre demande et vous contactera sous 48h à l'adresse{' '}
                <span className="text-amber-500">{formData.email}</span> pour finaliser les détails
                de votre voyage vers {selectedDestination?.label}.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Réservez votre
                  <span className="text-amber-500"> voyage temporel</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Remplissez le formulaire ci-dessous et notre équipe vous contactera pour finaliser votre réservation.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-900 to-black border border-amber-900/30 rounded-3xl p-8 sm:p-12 shadow-2xl"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-amber-500 font-semibold mb-2">Destination temporelle *</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-amber-900/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="">Choisissez votre époque</option>
                      {destinations.map(dest => (
                        <option key={dest.value} value={dest.value}>
                          {dest.label} - {dest.price.toLocaleString()}€/pers
                        </option>
                      ))}
                    </select>
                    {errors.destination && <p className="text-red-400 text-sm mt-1">{errors.destination}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-amber-500 font-semibold mb-2">Date de départ *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-amber-500 font-semibold mb-2">Nombre de voyageurs *</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-amber-500 font-semibold mb-2">Nom complet *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className="w-full bg-black/50 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-amber-500 font-semibold mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean.dupont@email.com"
                        className="w-full bg-black/50 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-amber-500 font-semibold mb-2">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 1 23 45 67 89"
                        className="w-full bg-black/50 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {totalPrice > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-lg">Prix total estimé :</span>
                        <span className="text-amber-500 text-2xl font-bold">{totalPrice.toLocaleString()}€</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        Tarif indicatif. Le prix final sera confirmé lors de la prise de contact.
                      </p>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
                  >
                    Confirmer ma réservation
                  </motion.button>

                  <p className="text-gray-500 text-sm text-center">
                    * Champs obligatoires
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
