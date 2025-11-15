
import React from 'react';
import { IconComponents } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <IconComponents.Camera className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Visual Product Matcher
        </h1>
      </div>
    </header>
  );
};
