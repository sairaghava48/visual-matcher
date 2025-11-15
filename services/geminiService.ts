
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      productId: {
        type: Type.STRING,
        description: 'The unique ID of the product.',
      },
      similarityScore: {
        type: Type.INTEGER,
        description: 'A score from 0 to 100 indicating visual similarity. 100 is a perfect match.',
      },
    },
    required: ['productId', 'similarityScore'],
  },
};

export async function findSimilarProducts(
  base64Image: string,
  mimeType: string,
  products: Product[]
): Promise<{ productId: string; similarityScore: number }[]> {

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };

  const productCatalogText = `
    Product Catalog:
    ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category })))}
  `;

  const prompt = `
    Analyze the user-provided image. Compare it visually against the products in the provided catalog.
    Identify the top 10 most visually similar products.
    Consider features like color, shape, style, and texture.
    Return a JSON array of objects, each containing the 'productId' and a 'similarityScore' from 0 to 100.
    Do not include products with a similarity score below 20.
    The response must be only the JSON array, matching the defined schema.
    ${productCatalogText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
      // Handle cases where Gemini might return an empty response if no matches are found
      return [];
    }
    
    const parsedResponse = JSON.parse(jsonString);

    if (!Array.isArray(parsedResponse)) {
      throw new Error("Gemini API returned an invalid format.");
    }

    return parsedResponse as { productId: string; similarityScore: number }[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI model. The model may be unable to process the request or the image provided.");
  }
}
