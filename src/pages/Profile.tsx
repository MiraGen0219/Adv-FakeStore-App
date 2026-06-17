import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { onAuthStateChanged, deleteUser } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setName(data.name || "");
          setAddress(data.address || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleUpdateProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name,
        address,
      });

      alert("Profile updated!");
    } catch (error) {
      console.error(error);
      alert("Profile update failed.");
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);

      alert("Account deleted.");
    } catch (error) {
      console.error(error);
      alert("Account deletion failed. You may need to log out and log back in first.");
    }
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>My Profile</h2>

      <p>Email: {user.email}</p>

      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default Profile;