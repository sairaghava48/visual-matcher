
export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export interface SimilarityResult extends Product {
  similarityScore: number;
}
