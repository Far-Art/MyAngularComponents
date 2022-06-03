export interface Product {
  name: string;
  picture: string;
  quantity: number;
  description: string[];
  tags: string[];
  category: string[];
  price: number;
  features: string[];
  specs: Map<any, any>[];
}
