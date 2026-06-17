import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { clearCart, removeFromCart } from "../features/cartSlice";
import { createOrder } from "../api/ordersApi";
import { auth } from "../firebase";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
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

  async function handlePlaceOrder() {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: String(item.id),
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category,
      quantity: item.count,
      subtotal: item.price * item.count,
    }));

    const newOrder = {
      userId: currentUser.uid,
      userEmail: currentUser.email || "",
      items: orderItems,
      totalPrice,
      totalItems: totalProducts,
      createdAt: new Date(),
    };

    try {
      await createOrder(newOrder);
      dispatch(clearCart());
      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  }

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
        <button onClick={handlePlaceOrder}>Place Order</button>
      )}

      {checkoutMessage && <p>{checkoutMessage}</p>}
    </main>
  );
}

export default Cart;