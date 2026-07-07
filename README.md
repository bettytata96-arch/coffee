# Coffee Shop — Full-Stack Web Application

## Project Description

A full-stack coffee shop web application built as the final capstone project for **Web Programming II**. Customers can browse the menu, register/login, place orders with a simulated Telebirr/Bank Transfer payment flow, view their order history, and leave reviews. Admins can manage the menu and update order statuses. The backend is a RESTful API built with Node.js and Express, backed by a relational SQLite database, with JWT-based authentication and role-based authorization.

**Note on payments:** This project simulates the Telebirr and Bank Transfer payment confirmation flow (phone number entry → processing animation → success with a generated transaction ID). No real money is processed and no real payment gateway is contacted — real Telebirr/bank merchant integration requires business registration and formal merchant agreements outside the scope of this course.

## Tech Stack

**Backend:**
- Node.js + Express.js
- SQLite (via `better-sqlite3`)
- JWT (`jsonwebtoken`) for authentication
- `bcrypt` for password hashing
- `morgan` for request logging
- Manual validation for input checking

**Frontend:**
- Vanilla HTML, CSS, JavaScript (no framework)
- Fetch API for all backend communication

**Architecture:**
- MVC pattern (Models / Controllers / Routes) on the backend
- RESTful API consumed by a separate static frontend
- Role-based access control (`customer` / `admin`)

## Features

- User registration & login with hashed passwords (bcrypt) and JWT-based sessions
- Role-based authorization (customers vs. admins)
- Public menu browsing; admin-only menu creation/editing/deletion
- Order placement with server-side price calculation (prices are never trusted from the client)
- Simulated Telebirr / Bank Transfer payment confirmation flow with a generated transaction ID
- Order history for logged-in users; admins can view and update all orders' statuses
- Customer reviews (create, view; owner or admin can delete)
- Request logging via Morgan
- Relational database with foreign keys and transactional order creation (all-or-nothing inserts)
- Login-gated actions: ordering, reviewing, and contacting all require an account

## Project StructureStart the server:
```bash
npm run dev
```
This automatically creates the SQLite database (`backend/db/coffee.db`) and applies the schema on first run. The server runs at `http://localhost:5000`.

### 3. Access the app

The Express server also serves the frontend directly. Open your browser to:No separate frontend server is needed — `index.html`, `login.html`, `gallery.html`, and `review.html` are all served as static files by the same Express app.

### 4. Create an admin account (optional)

By default, all registered users get the `customer` role. To test admin-only features (managing the menu, updating order statuses), promote a user directly in the database:
```bash
node -e "const db = require('./src/config/db'); db.prepare(\"UPDATE users SET role = 'admin' WHERE email = ?\").run('your@email.com'); console.log('done');"
```

## API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Log in, get JWT |
| GET | `/api/menu` | Public | List available menu items |
| POST | `/api/menu` | Admin | Add menu item |
| PUT | `/api/menu/:id` | Admin | Edit menu item |
| DELETE | `/api/menu/:id` | Admin | Remove menu item |
| POST | `/api/orders` | Logged-in user | Place an order (with simulated payment) |
| GET | `/api/orders/mine` | Logged-in user | View own order history |
| GET | `/api/orders` | Admin | View all orders |
| GET | `/api/orders/:id` | Owner or Admin | View a specific order |
| PATCH | `/api/orders/:id/status` | Admin | Update an order's status |
| GET | `/api/reviews` | Public | List all reviews |
| POST | `/api/reviews` | Logged-in user | Submit a review |
| DELETE | `/api/reviews/:id` | Owner or Admin | Delete a review |

## Extra Features Beyond Course Scope

- Simulated third-party payment confirmation flow (Telebirr / Bank Transfer) with generated transaction IDs and a realistic phone-number-based confirmation modal
- Database transactions for atomic order + order-item creation
- Role-based access control (RBAC) middleware, reusable across routes
- Server-side price recalculation to prevent client-side price tampering
- Ownership-based permissions on reviews (users can only delete their own; admins can delete any)
- Frontend authentication gating: ordering, reviewing, and contacting all redirect unauthenticated users to logincd C:\Users\metas\coffee-shop-project
git pull origin main
