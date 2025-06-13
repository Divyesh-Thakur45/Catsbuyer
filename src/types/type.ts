// Single cat object with multiple images
export type Cat = {
  images: string[];
  name: string;
  price: string;
  _id: string;
};

// Full API response containing multiple cats
export type CatResponse = {
  success: boolean;
  message: string;
  catsData: Cat[];
};

// @/types/type.ts

export interface cart {
  _id: string;
  name: string;
  price: number;
  image: string;
  loginID: string;
}

export interface cartResponse {
  status: number;
  message: string;
  cartData: cart[];
  success: boolean;
}
