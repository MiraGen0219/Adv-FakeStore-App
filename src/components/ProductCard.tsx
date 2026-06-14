import type { Product } from "../types/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product}: ProductCardProps) {

    const dispatch = useDispatch();

    return (
        <article className="product-card">
            <img className="product-image"
                src={product.image}
                alt={product.title}
                width="150"
                onError={(event) => {
                    event.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                }}
            />

            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>Rating: {product.rating.rate} / 5</p>

            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </article>
    );
}

export default ProductCard;