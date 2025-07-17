export type Product = {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  quantity: number;
  releaseDate: string;
  available: boolean;
  imageName?: string;
};


export type ProductDTO = Omit<Product, "id" | "available">;