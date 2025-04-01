
import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-purple-600">Lectoria</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Des histoires uniques pour des enfants uniques. 
              Créez des moments magiques de lecture qui resteront gravés dans leurs mémoires.
            </p>
            <p className="text-gray-500 italic">
              Parce qu'un enfant qui se sent unique devient un adulte confiant.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Liens utiles</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Accueil</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">Comment ça marche</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Nos tarifs</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Contact & Légal</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@lectoria.fr" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@lectoria.fr
                </a>
              </li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">CGV</a></li>
            </ul>
            
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Lectoria. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
