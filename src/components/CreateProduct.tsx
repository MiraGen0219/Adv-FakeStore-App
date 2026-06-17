import { useState } from "react";
import type { FormEvent } from "react";
import { createProduct } from "../api/productsApi";

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await createProduct({
        title,
        price: Number(price),
        description,
        category,
        image,
      });

      alert("Product created!");

      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Failed to create product.");
    }
  }

  return (
    <section className="create-product">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Create Product</button>
      </form>
    </section>
  );
}

export default CreateProduct;