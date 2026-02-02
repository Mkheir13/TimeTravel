import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Message {
  role: string;
  content: string;
}

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Tu es professionnel, chaleureux, passionné d'histoire et enthousiaste sans être familier.

DESTINATIONS DISPONIBLES :

1. Paris 1889 - Belle Époque
   - Prix : 8 500€ par personne
   - Points forts : Inauguration de la Tour Eiffel, Exposition Universelle, cabarets parisiens, art nouveau
   - Période idéale pour les amateurs d'art, d'architecture et de culture française
   - Durée recommandée : 5-7 jours

2. Crétacé -65 millions d'années
   - Prix : 15 000€ par personne
   - Points forts : Observation des dinosaures (T-Rex, Tricératops), forêts préhistoriques, volcans actifs
   - Sécurité maximale garantie avec bulle de protection temporelle
   - Durée recommandée : 3-5 jours
   - Pour les aventuriers et passionnés de paléontologie

3. Florence 1504 - Renaissance
   - Prix : 7 500€ par personne
   - Points forts : Michel-Ange au travail sur le David, chefs-d'œuvre artistiques, architecture florentine, famille des Médicis
   - Parfait pour les amateurs d'art et d'histoire de la Renaissance
   - Durée recommandée : 4-6 jours

INFORMATIONS GÉNÉRALES :
- Tous les voyages incluent : transport temporel aller-retour, hébergement d'époque, guide historien expert, assurance voyage temporel complète
- Âge minimum : 12 ans (18 ans pour le Crétacé)
- Groupes : 2-8 personnes maximum par voyage
- Préparation : briefing historique et culturel de 2 jours avant départ
- Langues : Français, anglais, italien (selon destination)

Tu dois :
- Répondre aux questions sur les destinations avec expertise et enthousiasme
- Aider les clients à choisir la destination selon leurs intérêts
- Donner des informations sur les prix, durées, ce qui est inclus
- Répondre aux questions sur la sécurité et le fonctionnement du voyage temporel
- Être rassurant sur la sécurité (technologie certifiée, assurée, testée depuis 2089)
- Suggérer des recommandations personnalisées
- Inviter à réserver via le formulaire de réservation sur le site

Ton ton est professionnel mais chaleureux, informatif mais captivant. Tu dois transmettre la magie du voyage temporel tout en restant crédible.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { messages } = await req.json() as { messages: Message[] };

    const mistralApiKey = Deno.env.get("MISTRAL_API_KEY");

    if (!mistralApiKey) {
      return new Response(
        JSON.stringify({
          message: "Je suis votre assistant TimeTravel Agency ! Malheureusement, je rencontre un problème de configuration. Pour toute question, n'hésitez pas à nous contacter directement à contact@timetravel.agency ou au +33 1 23 45 67 89. Nos destinations : Paris 1889 (8 500€), Crétacé -65M (15 000€), Florence 1504 (7 500€)."
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mistralApiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in chat function:", error);

    return new Response(
      JSON.stringify({
        message: "Je suis là pour vous aider ! Nos destinations phares : Paris 1889 (Belle Époque) à 8 500€, le Crétacé avec les dinosaures à 15 000€, et Florence 1504 (Renaissance) à 7 500€. Laquelle vous intéresse ? N'hésitez pas à utiliser notre formulaire de réservation ou à nous contacter directement !"
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  }
});
