
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <Progress value={scrollProgress} className="h-1 rounded-none" />
    </div>
  );
};

export default ScrollProgressBar;
