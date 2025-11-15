
import React from 'react';
import { SimilarityResult } from '../types';

interface ProductCardProps {
  product: SimilarityResult;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const scoreColor =
    product.similarityScore >= 85 ? 'bg-green-500' :
    product.similarityScore >= 60 ? 'bg-yellow-500' :
    'bg-orange-500';

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-bold text-gray-800 truncate" title={product.name}>{product.name}</h4>
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Similarity</span>
            <span className={`text-sm font-bold ${
                product.similarityScore >= 85 ? 'text-green-600' :
                product.similarityScore >= 60 ? 'text-yellow-600' :
                'text-orange-600'
            }`}>
                {product.similarityScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${scoreColor} h-2.5 rounded-full transition-all duration-500`}
              style={{ width: `${product.similarityScore}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
