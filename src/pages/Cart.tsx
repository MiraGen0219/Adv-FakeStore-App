import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { clearCart, removeFromCart } from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const checkoutMessage = useSelector(
    (state: RootState) => state.cart.checkoutMessage
  );

  const totalProducts = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <main className="page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} width="100" />

          <h3>{item.title}</h3>
          <p>Quantity: {item.count}</p>
          <p>Price: ${(item.price * item.count).toFixed(2)}</p>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total Items: {totalProducts}</h2>
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

      {cartItems.length > 0 && (
        <button onClick={() => dispatch(clearCart())}>
          Checkout
        </button>
      )}

      {checkoutMessage && <p>{checkoutMessage}</p>}
    </main>
  );
}

export default Cart;