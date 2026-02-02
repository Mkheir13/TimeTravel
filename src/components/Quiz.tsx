import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw, CheckCircle2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    label: string;
    result: string;
  }[];
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0); // 0: start, 1-4: questions, 5: result
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<{
    name: string;
    image: string;
    description: string;
  } | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "Quel type d'expérience recherchez-vous ?",
      options: [
        { id: 'a', label: 'Culturelle et artistique', result: 'florence' },
        { id: 'b', label: 'Aventure et nature', result: 'cretaceous' },
        { id: 'c', label: 'Élégance et raffinement', result: 'paris' }
      ]
    },
    {
      id: 2,
      text: "Votre période préférée ?",
      options: [
        { id: 'a', label: 'Histoire moderne (XIXe-XXe siècle)', result: 'paris' },
        { id: 'b', label: 'Temps anciens et origines', result: 'cretaceous' },
        { id: 'c', label: 'Renaissance et classicisme', result: 'florence' }
      ]
    },
    {
      id: 3,
      text: "Vous préférez :",
      options: [
        { id: 'a', label: 'L\'effervescence urbaine', result: 'paris' },
        { id: 'b', label: 'La nature sauvage', result: 'cretaceous' },
        { id: 'c', label: 'L\'art et l\'architecture', result: 'florence' }
      ]
    },
    {
      id: 4,
      text: "Votre activité idéale :",
      options: [
        { id: 'a', label: 'Visiter des monuments', result: 'paris' },
        { id: 'b', label: 'Observer la faune', result: 'cretaceous' },
        { id: 'c', label: 'Explorer des musées', result: 'florence' }
      ]
    }
  ];

  const handleAnswer = (result: string) => {
    const newAnswers = [...answers, result];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
    
    if (currentStep === questions.length) {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const counts: Record<string, number> = { paris: 0, cretaceous: 0, florence: 0 };
    finalAnswers.forEach(ans => counts[ans]++);
    
    let best = 'paris';
    if (counts.cretaceous > counts[best]) best = 'cretaceous';
    if (counts.florence > counts[best]) best = 'florence';
    
    const resultsData: Record<string, any> = {
      paris: {
        name: 'Paris 1889',
        image: '/paris.webp',
        description: 'Vous êtes un amateur d\'élégance et de progrès ! Le Paris de la Belle Époque est votre destination idéale pour admirer l\'Exposition Universelle.'
      },
      cretaceous: {
        name: 'Crétacé -65M',
        image: '/cetace.jpg',
        description: 'L\'aventure coule dans vos veines ! Partez à la rencontre des dinosaures et découvrez une nature sauvage et indomptée.'
      },
      florence: {
        name: 'Florence 1504',
        image: '/florence.jpg',
        description: 'Votre âme d\'artiste vous guide vers la Renaissance italienne. Assistez au génie de Michel-Ange et à l\'éclosion des plus grands chefs-d\'œuvre.'
      }
    };
    
    setRecommendation(resultsData[best]);
    setCurrentStep(5);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendation(null);
  };

  return (
    <section id="quiz" className="py-24 bg-black overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Trouvez votre <span className="text-amber-500">époque idéale</span>
          </h2>
          <p className="text-gray-400">Répondez à 4 questions pour découvrir votre destination temporelle.</p>
        </motion.div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-900/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center"
              >
                <div className="bg-amber-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Prêt à découvrir votre destin ?</h3>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center mx-auto space-x-2"
                >
                  <span>Commencer le Quiz</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {currentStep > 0 && currentStep <= questions.length && (
              <motion.div
                key={`q-${currentStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Question {currentStep} / 4</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentStep ? 'bg-amber-500' : 'bg-gray-800'}`} />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10">
                  {questions[currentStep - 1].text}
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {questions[currentStep - 1].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.result)}
                      className="group bg-gray-800/50 hover:bg-amber-500/10 border border-amber-900/20 hover:border-amber-500/50 p-6 rounded-2xl text-left transition-all duration-300 flex items-center justify-between"
                    >
                      <span className="text-gray-200 group-hover:text-white text-lg">{option.label}</span>
                      <div className="w-6 h-6 border-2 border-amber-900/50 group-hover:border-amber-500 rounded-full flex items-center justify-center transition-colors">
                        <div className="w-3 h-3 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 5 && recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-2">Votre destination idéale est...</h3>
                <h4 className="text-4xl font-bold text-amber-500 mb-8">{recommendation.name}</h4>
                
                <div className="relative h-64 w-full mb-8 rounded-2xl overflow-hidden shadow-2xl">
                  <img src={recommendation.image} alt={recommendation.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <p className="text-gray-200 text-lg italic">"{recommendation.description}"</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      const element = document.getElementById('booking');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
                  >
                    Réserver maintenant
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    <span>Recommencer le quiz</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
