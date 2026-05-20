export interface ProductImage {
  id: number;
  image_path: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id?: number;
  user_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: number;
  status: number;

  barcode?: string;
  qrcode?: string;

  category?: Category;
  images?: ProductImage[];
}