
import React from 'react';
import Header from '@/components/Header';
import BookCreator from '@/components/BookCreator';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import HeroNew from '@/components/HeroNew';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import SocialProof from '@/components/SocialProof';
import JoinAdventure from '@/components/JoinAdventure';
import ValuesSection from '@/components/ValuesSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroNew />
        <Pricing />
        <HowItWorks />
        <BookCreator />
        <Benefits />
        <SocialProof />
        <JoinAdventure />
        <ValuesSection />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
