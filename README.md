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
