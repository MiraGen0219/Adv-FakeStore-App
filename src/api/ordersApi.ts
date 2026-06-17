import { collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import type { Order } from "../types/Order";

const ordersCollection = collection(db, "orders");

export async function createOrder(order: Order) {
  const docRef = await addDoc(ordersCollection, order);

  return {
    id: docRef.id,
    ...order,
  };
}

export async function getOrdersByUser(userId: string) {
  const q = query(
    ordersCollection,
    where("userId", "==", userId),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
}

export async function getOrderById(orderId: string) {
  const docRef = doc(db, "orders", orderId);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("Order not found");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Order;
}