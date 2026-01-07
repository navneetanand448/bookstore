# 📚 Bookstore Backend API

A robust RESTful API for managing a bookstore inventory, built with Node.js, Express, and PostgreSQL (via Drizzle ORM). This project includes Docker support for easy deployment and development.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js (Inferred from structure)
* **Database:** PostgreSQL
* **ORM:** Drizzle ORM
* **Containerization:** Docker & Docker Compose

## 📂 Project Structure

```text
├── controller/      # Request handlers (logic for endpoints)
├── db/             # Database connection setup
├── drizzle/        # Drizzle migrations and schema management
├── middleware/     # Custom middleware (auth, logging, etc.)
├── models/         # Database models/schema definitions
├── router/         # API Route definitions
├── .env            # Environment variables (Git-ignored)
├── docker-compose.yml # Docker services configuration
└── drizzle.config.js  # Drizzle ORM configuration
