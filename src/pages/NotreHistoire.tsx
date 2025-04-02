
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotreHistoire = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Notre Histoire</h1>
          
          <div className="prose prose-lg mx-auto">
            {/* Contenu à remplir ultérieurement */}
            <p className="text-center text-gray-500 italic">
              Cette section sera complétée prochainement avec l'histoire de la création de Lectoria.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotreHistoire;
