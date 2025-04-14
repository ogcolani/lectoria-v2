
import React from 'react';

const HelpGuide: React.FC = () => {
  return (
    <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-center">Comment personnaliser ton héros ?</h3>
      <ol className="list-decimal list-inside space-y-3 ml-4">
        <li className="text-gray-700">
          <span className="font-medium">Définis l'identité</span> : Donne un prénom et un âge à ton personnage principal.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Choisis le genre</span> : Indique si ton héros est un garçon ou une fille.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Ajoute une description</span> : Mentionne ce que ton héros aime faire, ses loisirs ou ses rêves.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Choisis un trait de caractère</span> : Ce trait sera mis en avant dans l'histoire pour rendre ton héros unique.
        </li>
        <li className="text-gray-700">
          <span className="font-medium">Personnalise l'apparence</span> : Tu peux choisir si ton personnage porte des lunettes et voir en 3D comment il ressemble !
        </li>
      </ol>
      <p className="mt-4 text-center text-purple-700 font-medium">Ton héros sera illustré dans le même style que l'histoire, parfait pour les enfants de 6 à 10 ans.</p>
    </div>
  );
};

export default HelpGuide;
