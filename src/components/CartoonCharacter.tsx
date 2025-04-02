
import React from 'react';

const CartoonCharacter = () => {
  return (
    <div className="w-full h-64 relative">
      {/* Character Head */}
      <div className="absolute w-32 h-32 bg-[#FFD3B4] rounded-full left-1/2 top-4 -translate-x-1/2 shadow-md">
        {/* Eyes */}
        <div className="absolute w-6 h-8 bg-white rounded-full left-6 top-10 border-2 border-[#333]">
          <div className="absolute w-3 h-3 bg-[#333] rounded-full left-1 top-2"></div>
        </div>
        <div className="absolute w-6 h-8 bg-white rounded-full right-6 top-10 border-2 border-[#333]">
          <div className="absolute w-3 h-3 bg-[#333] rounded-full left-1 top-2"></div>
        </div>
        
        {/* Smile */}
        <div className="absolute w-14 h-5 rounded-b-full border-b-4 border-[#333] left-1/2 -translate-x-1/2 top-[22px]"></div>
        
        {/* Rosy Cheeks */}
        <div className="absolute w-5 h-3 bg-[#FFB6C1] rounded-full opacity-60 left-5 top-[22px]"></div>
        <div className="absolute w-5 h-3 bg-[#FFB6C1] rounded-full opacity-60 right-5 top-[22px]"></div>
        
        {/* Hair */}
        <div className="absolute -top-2 -left-2 -right-2 h-16 bg-[#8B5A2B] rounded-t-full"></div>
        <div className="absolute -top-4 left-[40%] w-6 h-10 bg-[#8B5A2B] rounded-md transform rotate-[-20deg]"></div>
        <div className="absolute -top-4 right-[40%] w-6 h-10 bg-[#8B5A2B] rounded-md transform rotate-[20deg]"></div>
      </div>
      
      {/* Character Body */}
      <div className="absolute w-40 h-24 bg-[#FFB6C1] rounded-t-3xl left-1/2 -translate-x-1/2 top-32 z-0">
        {/* Clothes */}
        <div className="absolute top-2 left-0 right-0 h-22 bg-[#9b87f5] rounded-t-xl"></div>
        
        {/* Arms */}
        <div className="absolute w-8 h-20 bg-[#FFD3B4] rounded-full -left-4 top-2 transform rotate-[20deg]"></div>
        <div className="absolute w-8 h-20 bg-[#FFD3B4] rounded-full -right-4 top-2 transform rotate-[-20deg]"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute w-6 h-6 bg-[#FFD700] rounded-full left-[30%] top-[75%] animate-pulse"></div>
      <div className="absolute w-6 h-6 bg-[#FFD700] rounded-full right-[30%] top-[75%] animate-pulse"></div>
    </div>
  );
};

export default CartoonCharacter;
