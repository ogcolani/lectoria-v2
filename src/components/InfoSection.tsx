
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="mt-12 max-w-5xl mx-auto bg-purple-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-center">Pourquoi seulement un aperçu ?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-bold text-lg mb-2 text-purple-700">Qualité premium</h4>
          <p className="text-gray-600">
            Nos histoires complètes sont soigneusement élaborées pour offrir une expérience de lecture immersive et enrichissante sur 40+ pages.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-bold text-lg mb-2 text-purple-700">Personnalisation avancée</h4>
          <p className="text-gray-600">
            La version complète inclut des illustrations personnalisées et un texte parfaitement adapté à l'âge et aux préférences de votre enfant.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-bold text-lg mb-2 text-purple-700">Valeur éducative</h4>
          <p className="text-gray-600">
            Chaque histoire complète est conçue pour transmettre des valeurs importantes tout en développant le goût de la lecture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
