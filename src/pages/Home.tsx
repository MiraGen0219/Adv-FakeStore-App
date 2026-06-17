import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories, getProductsByCategory } from "../api/productsApi";
import ProductCard from "../components/ProductCard";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: categories, 
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
        selectedCategory === "all"
            ? getProducts()
            : getProductsByCategory(selectedCategory),
  });

  if (productsLoading || categoriesLoading) {
    return <p>Loading...</p>;
  }

  if (productsError || categoriesError) {
    return <p>Error loading products.</p>;
  }

  return (
    <main className="page">
      <h1>Product Catalog</h1>

      <label htmlFor="category">Filter by category: </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}>

            <option value="all">All Products</option>

            {categories?.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>

        <section className="product-grid">
            {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </section>
    </main>
  );
}

export default Home;