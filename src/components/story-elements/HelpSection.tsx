
import React from 'react';

const HelpSection: React.FC = () => {
  return (
    <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-center">Comment personnaliser ton histoire ?</h3>
      <ol className="list-decimal list-inside space-y-3 ml-4">
        <li className="text-gray-700">
          <span className="font-medium">Choisis des valeurs</span> : Sélectionne jusqu'à 3 valeurs que tu souhaites mettre en avant dans ton histoire, ou ajoute les tiennes.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Ajoute des éléments d'histoire</span> : Sélectionne jusqu'à 3 éléments qui rendront ton histoire plus intéressante, ou crée tes propres éléments.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Prévisualisation</span> : Tu peux voir un aperçu des éléments que tu as choisis sur le côté gauche.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Poursuis l'aventure</span> : Une fois que tu es satisfait de tes choix, continue vers l'étape suivante.
        </li>
      </ol>
    </div>
  );
};

export default HelpSection;
