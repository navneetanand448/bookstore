
require("dotenv/config");
const { drizzle } = require("drizzle-orm/node-postgres");
// FIX: The 'P' must be capitalized!
const { Pool } = require("pg");
const schema = require("../models/index");

// Debug: Check if the database URL is actually loading
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is missing from .env");
  process.exit(1);
}

// Create the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle
const db = drizzle(pool, { schema });
console.log("API DATABASE_URL =", process.env.DATABASE_URL);

module.exports = db;