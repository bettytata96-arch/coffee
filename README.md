# Coffee Shop —Web Application

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
coffee-shop-project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── app.js
│   ├── db/
│   │   └── schema.sql
│   ├── server.js
│   └── .env
└── frontend/
    ├── index.html
    ├── gallery.html
    ├── review.html
    ├── login.html
    ├── auth.js
    ├── script2.js
    └── styleB.css
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
git clone https://github.com/bettytata96-arch/coffee.git
cd coffee
### 2. Set up the backend
cd backend
npm install

Create a `.env` file inside `backend/` with:
PORT=5000
JWT_SECRET=your_own_long_random_secret_string
NODE_ENV=development
Start the server:
npm run dev
This automatically creates the SQLite database (backend/db/coffee.db) and applies the schema on first run. The server runs at http://localhost:5000.

### 3. Access the app
http://localhost:5000
The Express server also serves the frontend directly. Open your browser to:
No separate frontend server is needed. index.html, login.html, gallery.html, and review.html are all served as static files by the same Express app.

### 4. Create an admin account (optional)
node -e "const db = require('./src/config/db'); db.prepare(\"UPDATE users SET role = 'admin' WHERE email = ?\").run('your@email.com'); console.log('done');"
By default, all registered users get the customer role. To test admin-only features, promote a user directly in the database:
## API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Create account |
| POST | /api/auth/login | Public | Log in, get JWT |
| GET | /api/menu | Public | List available menu items |
| POST | /api/menu | Admin | Add menu item |
| PUT | /api/menu/:id | Admin | Edit menu item |
| DELETE | /api/menu/:id | Admin | Remove menu item |
| POST | /api/orders | Logged-in user | Place an order (with simulated payment) |
| GET | /api/orders/mine | Logged-in user | View own order history |
| GET | /api/orders | Admin | View all orders |
| GET | /api/orders/:id | Owner or Admin | View a specific order |
| PATCH | /api/orders/:id/status | Admin | Update an order's status |
| GET | /api/reviews | Public | List all reviews |
| POST | /api/reviews | Logged-in user | Submit a review |
| DELETE | /api/reviews/:id | Owner or Admin | Delete a review |

## Extra Features Beyond Course Scope

- Simulated third-party payment confirmation flow (Telebirr / Bank Transfer) with generated transaction IDs and a realistic phone-number-based confirmation modal
- Database transactions for atomic order and order-item creation
- Role-based access control (RBAC) middleware, reusable across routes
- Server-side price recalculation to prevent client-side price tampering
- Ownership-based permissions on reviews (users can only delete their own; admins can delete any)
- Frontend authentication gating: ordering, reviewing, and contacting all redirect unauthenticated users to login
