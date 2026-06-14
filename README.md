# 🛒 Advanced FakeStore App

A modern e-commerce application built with **React**, **TypeScript**, **React Query**, **Redux Toolkit**, and the **FakeStore API**.

This project demonstrates API integration, global state management, persistent shopping cart functionality, client-side routing, and responsive UI development using modern React best practices.

---

## 🚀 Features

### 📦 Product Catalog

* Retrieve products from the FakeStore API using React Query
* Display:

  * Product image
  * Title
  * Price
  * Category
  * Description
  * Rating
* Dynamic category filtering
* Image fallback handling for broken API image URLs
* Responsive product grid layout

### 🔍 Category Navigation

* Categories retrieved dynamically from the FakeStore API
* Category dropdown populated from API data
* Products update automatically when a category is selected
* React Query caching and refetching based on selected category

### 🛒 Shopping Cart

* Add products directly from the product catalog
* View cart contents on a dedicated Shopping Cart page
* Quantity tracking for duplicate products
* Remove products from the cart
* Real-time cart updates

### 🧠 Redux Toolkit State Management

* Global cart state management
* Redux reducers and actions for:

  * Add to cart
  * Remove from cart
  * Checkout
* Typed Redux store using TypeScript

### 💾 Session Storage Persistence

* Cart automatically saved to sessionStorage
* Cart restored on page refresh
* Persistent shopping experience across browser sessions

### 💰 Cart Totals

* Dynamic total item count
* Dynamic total price calculation
* Automatic updates when products are added or removed

### ✅ Checkout Simulation

* Simulated checkout process
* Clears Redux cart state
* Clears sessionStorage
* Displays checkout success message

### 🎨 User Experience

* Responsive layout
* Product cards
* Cart cards
* Navigation bar
* Styled forms and buttons
* Consistent visual design

---

## 🛠️ Technologies Used

### Frontend

* React 19
* TypeScript
* Vite

### State Management

* Redux Toolkit
* React Redux

### Data Fetching

* TanStack React Query

### Routing

* React Router DOM

### API

* FakeStore API

### Styling

* CSS3

---

## 📂 Project Structure

```text
src
│
├── api
│   └── productsApi.ts
│
├── app
│   └── store.ts
│
├── components
│   └── ProductCard.tsx
│
├── pages
│   ├── Home.tsx
│   └── Cart.tsx
│
├── types
│   ├── Product.ts
│   └── CartItem.ts
│
├── cartSlice.ts
│
├── App.tsx
├── App.css
└── main.tsx
```

---

## ▶️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd adv-fakestore-app
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🧪 Key Concepts Demonstrated

### React Query

* Query caching
* Server state management
* Dynamic query keys
* Loading states
* Error handling

### Redux Toolkit

* Global state management
* Redux slices
* Reducers
* Actions
* Store configuration

### TypeScript

* Interfaces
* Typed API responses
* Typed Redux state
* Strong component props

### Session Storage

* Data persistence
* Serialization and deserialization
* Browser storage APIs

---

## 📚 Lessons Learned

This project provided hands-on experience with several technologies and concepts that are commonly used in modern React applications.

### React Query Simplifies API Management

Prior projects used local seed data and component state. React Query introduced a cleaner way to manage server-side data through query caching, automatic refetching, loading states, and error handling.

### Redux Toolkit Is Easier Than Traditional Redux

Redux initially appeared intimidating, but Redux Toolkit greatly reduced boilerplate code. Creating slices, reducers, and actions became much more straightforward than expected.

### TypeScript Catches Bugs Early

Several issues were identified immediately by TypeScript before the application was ever run. Examples included:

* Returning a function instead of calling it
* Missing reducer definitions
* Incorrect object properties
* Invalid component props

This helped reduce runtime debugging.

### Browser Developer Tools Are Essential

The Application tab in DevTools was particularly useful for verifying that sessionStorage was updating correctly whenever products were added or removed from the cart.

### State Management Requires Planning

Building the shopping cart highlighted the importance of deciding where data should live:

* React Query for API/server state
* Redux Toolkit for application state
* Session Storage for persistence

Separating responsibilities made the application easier to reason about and maintain.

### Incremental Development Reduces Bugs

The application was built in stages:

1. Product API integration
2. Product display
3. Category filtering
4. Redux setup
5. Cart functionality
6. Session storage
7. Checkout
8. Styling

Verifying each step before moving on made debugging significantly easier.

---

## 🎯 Future Improvements

* Product search functionality
* Sorting options (price, rating, category)
* Quantity increase/decrease buttons
* Cart badge in navigation bar
* Dark mode
* Toast notifications
* Loading skeletons
* Unit testing with Vitest
* Redux DevTools integration
* Checkout confirmation modal

---

## 👨‍💻 Author

Developed as part of a frontend engineering assignment focused on:

* React
* TypeScript
* React Query
* Redux Toolkit
* State Management
* API Integration
* Modern Frontend Development
