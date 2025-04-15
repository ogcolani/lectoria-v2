
import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeroNew = () => {
  return (
    <section className="w-full bg-gradient-to-b from-purple-50 via-white to-purple-50 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-h1-mobile md:text-h1-desktop mb-6 text-center leading-tight">
            Le seul livre personnalisé qui <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              fait rêver votre enfant
            </span>
            <br />
            <span className="text-gray-800">et qui l'aide à grandir !</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Un cadeau inoubliable qui stimule son imagination et ses valeurs essentielles
          </p>
          
          <div className="mt-8 mb-12 flex justify-center">
            <Link to="/creation-livre">
              <Button size="lg" className="px-8 py-4">
                Créer mon livre personnalisé
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
