import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  }

  return (
    <nav className="navbar">
      <Link to="/">Products</Link>
      <Link to="/cart">Shopping Cart</Link>

      {!user && <Link to="/register">Register</Link>}
      {!user && <Link to="/login">Login</Link>}

      {user && <Link to="/profile">Profile</Link>}

      <Link to="/orders">Order History</Link>

      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;