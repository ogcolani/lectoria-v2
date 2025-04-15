
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
import DiscoverLectoria from '@/components/DiscoverLectoria';
import OurMission from '@/components/OurMission';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroNew />
        <DiscoverLectoria />
        <HowItWorks />
        <BookCreator />
        <Benefits />
        <SocialProof />
        <ValuesSection />
        <Testimonials />
        <Pricing />
        <OurMission />
        <FAQ />
        <JoinAdventure />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
