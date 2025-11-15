
import React, { useState, useCallback } from 'react';
import { ImageInput } from './components/ImageInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { findSimilarProducts } from './services/geminiService';
import { getProducts } from './services/productService';
import { SimilarityResult } from './types';
import { IconComponents } from './components/IconComponents';

type View = 'search' | 'results';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ url: string; mimeType: string; } | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SimilarityResult[]>([]);
  const [view, setView] = useState<View>('search');

  const handleSearch = useCallback(async (imageData: { base64: string; mimeType: string; url: string }) => {
    setIsLoading(true);
    setError(null);
    setUploadedImage({ url: imageData.url, mimeType: imageData.mimeType });
    setSimilarProducts([]);
    setView('results');

    try {
      const allProducts = getProducts();
      const results = await findSimilarProducts(imageData.base64, imageData.mimeType, allProducts);
      
      const enrichedResults = results
        .map(result => {
          const product = allProducts.find(p => p.id === result.productId);
          return product ? { ...product, similarityScore: result.similarityScore } : null;
        })
        .filter((p): p is SimilarityResult => p !== null);

      setSimilarProducts(enrichedResults);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewSearch = () => {
    setView('search');
    setUploadedImage(null);
    setSimilarProducts([]);
    setError(null);
  };

  const WelcomeScreen = () => (
    <div className="w-full max-w-2xl mx-auto text-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <IconComponents.Search className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Products Visually</h2>
        <p className="text-gray-600 mb-8">
          Upload an image or provide a URL to find visually similar products from our catalog.
        </p>
        <ImageInput onSearch={handleSearch} disabled={isLoading} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {view === 'search' && <WelcomeScreen />}
        {view === 'results' && (
          <div>
            {isLoading && <Loader message="Analyzing image and finding matches..." />}
            {error && (
              <div className="text-center max-w-xl mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
                <button
                  onClick={handleNewSearch}
                  className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                  Try Again
                </button>
              </div>
            )}
            {!isLoading && uploadedImage && (
              <ResultsDisplay
                uploadedImage={uploadedImage.url}
                results={similarProducts}
                onNewSearch={handleNewSearch}
                hasError={!!error}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
