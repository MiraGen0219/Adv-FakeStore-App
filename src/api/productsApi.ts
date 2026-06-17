import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Product } from "../types/Product";

const productsCollection = collection(db, "products");

export async function fetchProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Product, "id">),
  }));
}

export async function createProduct(
  product: Omit<Product, "id">
): Promise<void> {
  await addDoc(productsCollection, product);
}

export async function updateProduct(product: Product): Promise<void> {
  const productRef = doc(db, "products", product.id);

  await updateDoc(productRef, {
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  const productRef = doc(db, "products", productId);

  await deleteDoc(productRef);
}

export async function getProducts(): Promise<Product[]> {
    return fetchProducts();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const products = await fetchProducts();

    return products.filter((product) => product.category === category);
}

export async function getCategories(): Promise<string[]> {
    const products = await fetchProducts();

    const categories = products.map((product) => product.category);

    return [...new Set(categories)];
}  