
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({
  quote,
  name,
  relation,
  stars = 5
}: {
  quote: string;
  name: string;
  relation: string;
  stars?: number;
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-4 flex">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 italic mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <span className="font-bold text-purple-600">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{relation}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return null;
};

export default Testimonials;

