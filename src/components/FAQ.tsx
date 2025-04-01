
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "En combien de temps je reçois mon livre ?",
      answer: "En moyenne sous 5 à 7 jours ouvrés. L'impression est réalisée à la commande."
    },
    {
      question: "Est-ce que je peux modifier une commande ?",
      answer: "Si elle n'est pas encore imprimée, bien sûr. Écrivez-nous rapidement."
    },
    {
      question: "L'histoire est vraiment personnalisée ?",
      answer: "Oui, chaque texte et chaque illustration sont générés selon les infos que vous entrez."
    },
    {
      question: "Et si je ne suis pas satisfait ?",
      answer: "On vous rembourse. C'est aussi simple que ça."
    },
    {
      question: "Puis-je commander depuis l'étranger ?",
      answer: "Oui, nous livrons partout en Europe. Les frais de port sont calculés au moment de la commande."
    },
    {
      question: "Pour quelle tranche d'âge sont adaptées les histoires ?",
      answer: "Nos histoires sont conçues pour les enfants de 3 à 10 ans, avec un niveau de texte adapté à l'âge que vous indiquez."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-lectoria-blue/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">🧠 Questions fréquentes</h2>
        
        <div className="mt-12 animate-fade-in">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
