import type { Timestamp } from "firebase/firestore";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: Date | Timestamp;
}