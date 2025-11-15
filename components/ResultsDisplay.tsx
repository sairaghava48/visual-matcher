
import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { SimilarityResult } from '../types';

interface ResultsDisplayProps {
  uploadedImage: string;
  results: SimilarityResult[];
  onNewSearch: () => void;
  hasError: boolean;
}

type SortOption = 'similarity_desc' | 'similarity_asc' | 'name_asc' | 'name_desc';

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ uploadedImage, results, onNewSearch, hasError }) => {
  const [sortBy, setSortBy] = useState<SortOption>('similarity_desc');

  const sortedResults = useMemo(() => {
    const sorted = [...results];
    switch (sortBy) {
      case 'similarity_desc':
        return sorted.sort((a, b) => b.similarityScore - a.similarityScore);
      case 'similarity_asc':
        return sorted.sort((a, b) => a.similarityScore - b.similarityScore);
      case 'name_asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [results, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/3 xl:w-1/4 space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Your Image</h3>
          <img src={uploadedImage} alt="Uploaded by user" className="rounded-lg w-full object-contain" />
        </div>
        <button
          onClick={onNewSearch}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          Start New Search
        </button>
      </aside>

      <section className="flex-grow">
        {!hasError && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
                Found {results.length} Similar Product{results.length !== 1 ? 's' : ''}
              </h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="p-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="similarity_desc">Similarity (High to Low)</option>
                  <option value="similarity_asc">Similarity (Low to High)</option>
                  <option value="name_asc">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                </select>
              </div>
            </div>

            {sortedResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
                <p className="text-gray-600">No similar products found. Try another image!</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
