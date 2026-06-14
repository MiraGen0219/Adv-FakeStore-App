import type { Product } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts(): Promise <Product[]> {
    const response = await fetch(BASE_URL);

    if(!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

export async function getCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}

export async function getProductsByCategory(
    category: string
): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/category/${category}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products by category");
    }

    return response.json();
}