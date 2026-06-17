import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/ordersApi";
import type { Order } from "../types/Order";

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;

      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;

  if (!order) return <p>Order not found.</p>;

  return (
    <main className="page">
      <h1>Order Details</h1>

      <h3>Order ID: {order.id}</h3>

      <p>
        Date: {order.createdAt instanceof Date
            ? order.createdAt.toLocaleDateString()
            : order.createdAt.toDate().toLocaleDateString()
            }
      </p>

      <p>Total Items: {order.totalItems}</p>
      <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

      <h2>Products</h2>

      {order.items.map((item) => (
        <div key={item.productId} className="order-item">
          <img src={item.image} alt={item.title} width="100" />

          <h3>{item.title}</h3>
          <p>Category: {item.category}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price Each: ${item.price.toFixed(2)}</p>
          <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
        </div>
      ))}
    </main>
  );
}

export default OrderDetails;