
import React from 'react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseLectoria from '@/components/WhyChooseLectoria';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import BookCreator from '@/components/BookCreator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <BookCreator />
        <HowItWorks />
        <WhyChooseLectoria />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
