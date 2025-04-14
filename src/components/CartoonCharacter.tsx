
import React from 'react';
import { Stars } from 'lucide-react';

const CartoonCharacter = () => {
  return (
    <div className="w-full h-64 relative bg-gradient-to-b from-[#1A1F2C] to-[#2E3A59] rounded-xl overflow-hidden">
      {/* Night Sky Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        {/* Stars */}
        <div className="absolute top-2 left-5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-4 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-6 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3 right-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-7 right-5 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        
        {/* Shooting Star */}
        <div className="absolute top-5 right-20 w-10 h-1 bg-gradient-to-r from-transparent to-white rounded-full transform -rotate-12 animate-pulse"></div>
        
        {/* Pink Clouds */}
        <div className="absolute top-10 left-0 w-32 h-6 bg-[#FFDEE2] opacity-30 rounded-full filter blur-md"></div>
        <div className="absolute top-6 right-5 w-40 h-8 bg-[#FFDEE2] opacity-20 rounded-full filter blur-md"></div>
        
        {/* Small Planets */}
        <div className="absolute top-8 right-10 w-4 h-4 bg-[#9b87f5] rounded-full opacity-70"></div>
        <div className="absolute top-15 left-15 w-6 h-6 bg-[#7E69AB] rounded-full opacity-60"></div>
      </div>
      
      {/* Character - Noah */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        {/* Character Head */}
        <div className="relative w-20 h-20 bg-[#FFD3B4] rounded-full shadow-md">
          {/* Eyes */}
          <div className="absolute w-4 h-5 bg-white rounded-full left-4 top-6 border-2 border-[#333]">
            <div className="absolute w-2 h-2 bg-[#333] rounded-full left-1 top-1"></div>
          </div>
          <div className="absolute w-4 h-5 bg-white rounded-full right-4 top-6 border-2 border-[#333]">
            <div className="absolute w-2 h-2 bg-[#333] rounded-full left-1 top-1"></div>
          </div>
          
          {/* Smile - Wonder Expression */}
          <div className="absolute w-6 h-2 rounded-b-full border-b-2 border-[#333] left-1/2 -translate-x-1/2 top-12"></div>
          
          {/* Rosy Cheeks */}
          <div className="absolute w-3 h-2 bg-[#FFB6C1] rounded-full opacity-60 left-3 top-10"></div>
          <div className="absolute w-3 h-2 bg-[#FFB6C1] rounded-full opacity-60 right-3 top-10"></div>
          
          {/* Hair */}
          <div className="absolute -top-1 -left-1 -right-1 h-10 bg-[#8B4513] rounded-t-full"></div>
          <div className="absolute -top-2 left-[40%] w-3 h-6 bg-[#8B4513] rounded-md transform rotate-[-20deg]"></div>
          <div className="absolute -top-2 right-[40%] w-3 h-6 bg-[#8B4513] rounded-md transform rotate-[20deg]"></div>
        </div>
        
        {/* Character Body - Blue Hoodie */}
        <div className="absolute w-24 h-16 bg-[#1EAEDB] rounded-t-xl left-1/2 -translate-x-1/2 top-[18px]">
          {/* Star Pattern on Hoodie */}
          <div className="absolute w-3 h-3 bg-[#FFD700] clip-path-star left-4 top-4"></div>
          <div className="absolute w-2 h-2 bg-[#FFD700] clip-path-star right-4 top-6"></div>
          <div className="absolute w-2 h-2 bg-[#FFD700] clip-path-star left-10 top-8"></div>
          
          {/* Arms */}
          <div className="absolute w-6 h-12 bg-[#1EAEDB] rounded-full -left-2 top-2 transform rotate-[20deg]"></div>
          <div className="absolute w-6 h-12 bg-[#1EAEDB] rounded-full -right-2 top-2 transform rotate-[-20deg]"></div>
        </div>
        
        {/* Gray Cargo Pants */}
        <div className="absolute w-20 h-10 bg-[#403E43] rounded-t-sm left-1/2 -translate-x-1/2 top-[34px]">
          <div className="absolute w-4 h-4 bg-[#8A898C] rounded-sm left-2 top-4"></div>
          <div className="absolute w-4 h-4 bg-[#8A898C] rounded-sm right-2 top-4"></div>
        </div>
        
        {/* Worn-out Sneakers */}
        <div className="absolute w-6 h-3 bg-[#8A898C] rounded-full left-[30%] top-[44px]"></div>
        <div className="absolute w-6 h-3 bg-[#8A898C] rounded-full right-[30%] top-[44px]"></div>
        
        {/* Backpack */}
        <div className="absolute w-16 h-14 bg-[#8B4513] rounded-md left-1/2 -translate-x-1/2 top-[12px] -z-10">
          {/* Space Gadgets sticking out */}
          <div className="absolute w-4 h-4 bg-[#FFD700] rounded-full left-2 top-2 -z-10"></div>
          <div className="absolute w-6 h-2 bg-[#C0C0C0] rounded-md right-1 top-4 transform rotate-45 -z-10"></div>
          <div className="absolute w-3 h-3 bg-[#9b87f5] rounded-full right-3 top-8 -z-10"></div>
        </div>
      </div>
      
      {/* Rock */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 bg-[#555] rounded-t-full"></div>
      
      {/* Magical Atmosphere Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent mix-blend-overlay"></div>
      
      {/* Stars Icon for decoration */}
      <Stars className="absolute top-4 right-4 w-6 h-6 text-[#FFD700] animate-pulse" />
    </div>
  );
};

export default CartoonCharacter;
