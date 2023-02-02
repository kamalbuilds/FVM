export interface ClientToServerEvents {
  addProduct: (Product: Product) => void;
  bidProduct: (Product: Product) => void;
  addResponse: (Product: Product) => void;
  bidResponse: (Product: Product) => void
}

export interface Product {
  id?: number;
  userInput?: string;
  name: string | undefined;
  price?: number;
  owner?: string;
  last_bidder?: string;
}