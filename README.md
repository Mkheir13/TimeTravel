# TimeTravel Agency

Une webapp moderne et interactive pour une agence de voyage temporel de luxe, avec chatbot IA intégré.

## Fonctionnalités

- **Design premium** : Interface élégante avec thème sombre et accents dorés
- **3 destinations temporelles** :
  - Paris 1889 - Belle Époque
  - Crétacé -65M - Dinosaures
  - Florence 1504 - Renaissance
- **Chatbot IA** : Assistant virtuel alimenté par Mistral AI pour répondre aux questions
- **Formulaire de réservation** : Avec validation complète
- **Animations fluides** : Scroll animations et micro-interactions
- **Responsive** : Mobile-first, optimisé pour tous les appareils

## Technologies

- React + TypeScript
- Tailwind CSS
- Vite
- Supabase (Edge Functions)
- Mistral AI

## Démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
```bash
cp .env.example .env
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Build pour production :
```bash
npm run build
```

## Structure

- `/src/components` : Composants React
  - `Header.tsx` : Navigation avec menu mobile
  - `Hero.tsx` : Section hero avec animations
  - `About.tsx` : Présentation de l'agence
  - `Destinations.tsx` : Galerie des 3 destinations
  - `BookingForm.tsx` : Formulaire de réservation
  - `ChatBot.tsx` : Widget de chat IA
  - `Footer.tsx` : Pied de page

- `/supabase/functions/chat` : Edge Function pour le chatbot IA

## Chatbot IA

Le chatbot utilise Mistral AI pour répondre aux questions sur :
- Les destinations et leurs caractéristiques
- Les prix et ce qui est inclus
- Les recommandations personnalisées
- La sécurité des voyages temporels

## License

Propriété de TimeTravel Agency - Tous droits réservés dans toutes les époques.
