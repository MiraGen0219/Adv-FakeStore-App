import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getOrdersByUser } from "../api/ordersApi";
import type { Order } from "../types/Order";

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            setOrders([]);
            setLoading(false);
            return;
        }

        try {
            const userOrders = await getOrdersByUser(user.uid);
            setOrders(userOrders);
        }   catch (error) {
            console.error(error);
        }   finally {
            setLoading(false);
        }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading order history...</p>;
  }

  return (
    <main className="page">
      <h1>Order History</h1>

      {orders.length === 0 && <p>You have not placed any orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3>Order ID: {order.id}</h3>

          <p>
            Date:{" "}
            {order.createdAt && "toDate" in order.createdAt
              ? order.createdAt.toDate().toLocaleDateString()
              : "Date unavailable"}
          </p>

          <p>Total Items: {order.totalItems}</p>
          <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

          <Link to={`/orders/${order.id}`}>View Details</Link>
        </div>
      ))}
    </main>
  );
}

export default OrderHistory;