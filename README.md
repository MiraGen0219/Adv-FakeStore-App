# 🛍️ Advanced FakeStore App

A full-stack React e-commerce application demonstrating modern frontend development practices using TypeScript, Redux Toolkit, Firebase Authentication, and CI/CD with GitHub Actions.

## 🌐 Live Demo

**Live Application:** (https://adv-fakestore-n4fmdjh1u-erin4.vercel.app)

---

## 🚀 Features

### 🔐 Authentication

* User registration with Firebase Authentication
* User login/logout
* Protected user sessions
* Persistent authentication state

### 👤 User Management

* Create user profiles in Firestore
* Read user information
* Update user information
* Delete user accounts
* User data synchronized with Firebase Authentication

### 📦 Product Management

* Create products
* Read products from Firestore
* Update products
* Delete products
* Product image support
* Dynamic category generation
* Firestore replaces the original Fake Store API

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Quantity management
* Cart total calculations
* Session storage persistence
* Empty cart functionality

### 📋 Order Management

#### Create Orders

* Convert cart contents into completed orders
* Store orders in Firestore
* Associate orders with authenticated users
* Save product snapshots at time of purchase
* Store order totals and quantities

#### Order History

* View previously placed orders
* Display order creation date
* Display total items purchased
* Display order total price
* View individual order details

#### Order Details

* View complete order contents
* Product images
* Product categories
* Quantity purchased
* Individual item subtotals
* Order totals

---

## 🛠️ Technologies Used

### Frontend

* React
* TypeScript
* React Router
* Redux Toolkit
* CSS

### Backend / Cloud Services

* Firebase Authentication
* Cloud Firestore

### State Management

* Redux Toolkit
* React Hooks

### Storage

* Firestore Database
* Session Storage

---

## 📂 Project Structure

```text
src/
├── api/
│   ├── productsApi.ts
│   ├── usersApi.ts
│   └── ordersApi.ts
│
├── app/
│   └── store.ts
│
├── features/
│   └── cartSlice.ts
│
├── pages/
│   ├── Products.tsx
│   ├── Cart.tsx
│   ├── OrderHistory.tsx
│   ├── OrderDetails.tsx
│   ├── Login.tsx
│   └── Register.tsx
│
├── types/
│   ├── Product.ts
│   ├── User.ts
│   ├── Order.ts
│   └── CartItem.ts
│
└── firebase.ts
```

---

## 🎯 Learning Objectives Demonstrated

### React

* Functional Components
* Hooks
* Routing
* Conditional Rendering
* Form Handling

### TypeScript

* Interfaces
* Type Safety
* Generic Types
* Redux Integration

### Redux Toolkit

* Global State Management
* Actions
* Reducers
* Slices

### Firebase

* Authentication
* Firestore CRUD Operations
* Collection Queries
* User-Based Data Access

### Software Engineering

* Separation of Concerns
* API Layer Architecture
* Component Reusability
* State Persistence
* Error Handling

---

## 🔮 Future Enhancements

* Admin role management
* Product search and filtering
* Product ratings and reviews
* Inventory tracking
* Order status tracking
* User profile page
* Pagination
* Responsive mobile design
* Cloud Storage image uploads
* Stripe payment integration
* Sales analytics dashboard
* Wishlist functionality

---

## 📚 Key Lessons Learned

### Firebase Data Modeling

One of the most important lessons was designing Firestore collections and relationships. User data, products, carts, and orders all required different storage strategies and careful consideration of how data would be queried.

### Authentication State Management

Firebase Authentication does not immediately provide user information on page refreshes. Learning to use authentication listeners correctly was essential for building reliable protected pages and user-specific data.

### Redux State Persistence

Managing shopping cart state required balancing Redux state with browser session storage to provide a smooth user experience while maintaining predictable application state.

### Order Snapshot Design

Orders were designed to store a snapshot of product information at the time of purchase rather than referencing products directly. This ensures order history remains accurate even if products are edited or removed later.

### TypeScript Integration

Working with Firebase, Firestore Timestamps, Redux Toolkit, and React together highlighted the importance of strong typing and interface design throughout an application.

## Testing

Run tests locally:

npm run test:run

This project includes:

- Unit tests (Vitest + React Testing Library)
- Integration testing
- GitHub Actions CI
- Automatic deployment to Vercel after successful tests

### Full-Stack Development Workflow

This project provided hands-on experience with frontend development, backend cloud services, database design, authentication, state management, and deployment-ready architecture within a single application.

