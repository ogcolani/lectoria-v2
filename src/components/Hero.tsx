
import React from 'react';
import Button from './Button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lectoria-purple/30 via-lectoria-pink/20 to-transparent"
        aria-hidden="true"
      />
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-38">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left lg:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              <span className="block">📚 Créez un livre magique où</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                votre enfant devient le héros.
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Offrez-lui une aventure unique, écrite rien que pour lui. Grâce à l'intelligence artificielle, 
              Lectoria génère une histoire sur-mesure à partir de son prénom, de ses passions et de son univers préféré.
            </p>
            <div className="mt-10">
              <Button size="lg">
                ➡️ Créer son livre maintenant
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:ml-10 lg:w-1/2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-md">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-lectoria-purple/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-lectoria-pink/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lectoria-blue/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <div className="bg-white p-6 rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                    alt="Enfant lisant un livre" 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1471440671318-55bdbb772f93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Livre ouvert" 
                    className="w-32 h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
