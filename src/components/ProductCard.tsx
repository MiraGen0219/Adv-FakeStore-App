import { useState } from "react";
import type { FormEvent } from "react";
import type { Product } from "../types/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { deleteProduct, updateProduct } from "../api/productsApi";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${product.title}?`
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);
      alert("Product deleted!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await updateProduct({
        ...product,
        title,
        price: Number(price),
        category,
        description,
        image,
      });

      alert("Product updated!");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  }

  if (isEditing) {
    return (
      <article className="product-card">
        <h3>Edit Product</h3>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />

          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </article>
    );
  }

  return (
    <article className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.title}
        width="150"
        onError={(event) => {
          event.currentTarget.src =
            "https://via.placeholder.com/150?text=No+Image";
        }}
      />

      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>

      {product.rating ? (
        <p>
          Rating: {product.rating.rate} * ({product.rating.count})
        </p>
      ) : (
        <p>Rating: No rating yet</p>
      )}

      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      <button onClick={() => setIsEditing(true)}>Edit Product</button>
      <button onClick={handleDelete}>Delete Product</button>
    </article>
  );
}

export default ProductCard;