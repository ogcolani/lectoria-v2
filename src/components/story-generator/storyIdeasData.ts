
export interface StoryIdea {
  text: string;
  label: string;
  gender: "garçon" | "fille" | "both";
  minAge?: number;
  maxAge?: number;
  themes: string[];
}

export const storyIdeas: StoryIdea[] = [
  {
    text: "Une aventure dans une forêt enchantée où les arbres parlent et cachent un trésor ancien.",
    label: "Forêt enchantée",
    gender: "both",
    minAge: 4,
    maxAge: 10,
    themes: ["Aventure", "Nature", "Magie"]
  },
  {
    text: "Un voyage sous-marin à la découverte d'une cité perdue et de ses habitants.",
    label: "Monde sous-marin",
    gender: "both",
    minAge: 5,
    maxAge: 12,
    themes: ["Exploration", "Amitié", "Découverte"]
  },
  {
    text: "Une petite fille qui découvre qu'elle peut parler aux animaux et les aide à résoudre leurs problèmes.",
    label: "Amis animaux",
    gender: "fille",
    minAge: 4,
    maxAge: 8,
    themes: ["Amitié", "Animaux", "Entraide"]
  },
  {
    text: "Un petit garçon qui découvre qu'il peut parler aux animaux et devient leur protecteur.",
    label: "Gardien des animaux",
    gender: "garçon",
    minAge: 4,
    maxAge: 8,
    themes: ["Protection", "Animaux", "Responsabilité"]
  },
  {
    text: "Une quête magique dans les étoiles à la recherche d'une constellation disparue.",
    label: "Aventure spatiale",
    gender: "both",
    minAge: 6,
    maxAge: 12,
    themes: ["Aventure", "Espace", "Courage"]
  },
  {
    text: "L'histoire d'un petit dragon qui apprend à faire de la pâtisserie plutôt que de cracher du feu.",
    label: "Dragon pâtissier",
    gender: "both",
    minAge: 4,
    maxAge: 8,
    themes: ["Créativité", "Persévérance", "Cuisine"]
  },
  {
    text: "Une jeune exploratrice qui part à la recherche d'un arc-en-ciel magique.",
    label: "Exploratrice magique",
    gender: "fille",
    minAge: 5,
    maxAge: 10,
    themes: ["Aventure", "Magie", "Courage"]
  },
  {
    text: "Un jeune inventeur qui crée une machine pour voyager dans le temps et rencontre des dinosaures amicaux.",
    label: "Inventeur du temps",
    gender: "garçon",
    minAge: 6,
    maxAge: 12,
    themes: ["Science", "Aventure", "Amitié"]
  },
  {
    text: "Une école secrète où les enfants apprennent à faire pousser des bonbons magiques.",
    label: "École des bonbons",
    gender: "both",
    minAge: 5,
    maxAge: 10,
    themes: ["Magie", "Amitié", "Créativité"]
  },
  {
    text: "L'aventure d'un nuage qui veut devenir arc-en-ciel.",
    label: "Nuage coloré",
    gender: "both",
    minAge: 3,
    maxAge: 7,
    themes: ["Transformation", "Courage", "Nature"]
  },
  {
    text: "Un cirque magique où les acrobates volent vraiment et les clowns peuvent se transformer.",
    label: "Cirque enchanté",
    gender: "both",
    minAge: 5,
    maxAge: 10,
    themes: ["Magie", "Spectacle", "Rêve"]
  }
];

