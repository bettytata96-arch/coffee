# Coffee Shop — Full-Stack Web Application

## Project Description

A full-stack coffee shop web application built as the final capstone project for **Web Programming II**. Customers can browse the menu, register/login, place orders with a simulated Telebirr/Bank Transfer payment flow, view their order history, and leave reviews. Admins can manage the menu and update order statuses. The backend is a RESTful API built with Node.js and Express, backed by a relational SQLite database, with JWT-based authentication and role-based authorization.

**Note on payments:** This project simulates the Telebirr and Bank Transfer payment confirmation flow (phone number entry, processing animation, success with a generated transaction ID). No real money is processed and no real payment gateway is contacted. Real Telebirr/bank merchant integration requires business registration and formal merchant agreements outside the scope of this course.

## Tech Stack

**Backend:** Node.js, Express.js, SQLite (via better-sqlite3), JWT (jsonwebtoken) for authentication, bcrypt for password hashing, morgan for request logging.

**Frontend:** Vanilla HTML, CSS, JavaScript (no framework), Fetch API for backend communication.

**Architecture:** MVC pattern (Models / Controllers / Routes) on the backend, RESTful API consumed by a separate static frontend, role-based access control (customer / admin).

## Features

- User registration and login with hashed passwords (bcrypt) and JWT-based sessions
- Role-based authorization (customers vs. admins)
- Public menu browsing; admin-only menu creation, editing, and deletion
- Order placement with server-side price calculation (prices are never trusted from the client)
- Simulated Telebirr / Bank Transfer payment confirmation flow with a generated transaction ID
- Order history for logged-in users; admins can view and update all orders' statuses
- Customer reviews (create, view; owner or admin can delete)
- Request logging via Morgan
- Relational database with foreign keys and transactional order creation
- Login-gated actions: ordering, reviewing, and contacting all require an account
  
## Project Structure
## Database Schema (DDL)

The full schema lives at `backend/db/schema.sql`. Summary of tables:

- **users** — id, name, email (unique), password_hash, role (customer/admin), created_at
- **menu_items** — id, name, description, price, image_url, is_available, created_at
- **orders** — id, user_id (FK to users), payment_method (Telebirr/Bank Transfer), phone_number, transaction_id, status (pending/confirmed/completed/cancelled), total_price, created_at
- **order_items** — id, order_id (FK to orders), menu_item_id (FK to menu_items), quantity, unit_price
- **reviews** — id, user_id (FK to users), rating (1-5), comment, created_at

Foreign keys are enforced, and order creation (order plus its line items) happens inside a single database transaction to guarantee consistency.

## Setup and Run Instructions

### Prerequisites

- Node.js (LTS version)
- Git

### 1. Clone the repository
### 2. Set up the backend
Create a `.env` file inside `backend/` with:
Start the server:
This automatically creates the SQLite database (backend/db/coffee.db) and applies the schema on first run. The server runs at http://localhost:5000.

### 3. Access the app

The Express server also serves the frontend directly. Open your browser to:
No separate frontend server is needed. index.html, login.html, gallery.html, and review.html are all served as static files by the same Express app.

### 4. Create an admin account (optional)

By default, all registered users get the customer role. To test admin-only features, promote a user directly in the database:
