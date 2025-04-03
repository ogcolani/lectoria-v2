import React, { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Scroll, Sparkles, Rocket, BookOpen, Laugh } from 'lucide-react';
const BookCreator = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(1);
  const handleNextStep = () => {
    setStep(prev => prev + 1);
    setProgress(prev => prev + 33); // Approximation pour 3 étapes
  };
  return;
};
export default BookCreator;