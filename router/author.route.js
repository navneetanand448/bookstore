const express = require("express");
const router = express.Router();

const authorTable = require("../models/author.model");
const booksTable = require("../models/book.model");
const db = require("../db");

const { eq } = require("drizzle-orm");
const { isUUID } = require("validator");

/* ======================
   GET books by author ID
====================== */
router.get("/:id/books", async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({
      error: "Invalid author ID format",
    });
  }

  try {
    const books = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.authorId, id));

    return res.json(books);
  } catch (error) {
    console.error("GET AUTHOR BOOKS ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/* ======================
   GET all authors
====================== */
router.get("/", async (req, res) => {
  try {
    const authors = await db.select().from(authorTable);
    return res.json(authors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* ======================
   GET author by ID
====================== */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({
      error: "Invalid author ID format",
    });
  }

  try {
    const [author] = await db
      .select()
      .from(authorTable)
      .where(eq(authorTable.id, id));

    if (!author) {
      return res
        .status(404)
        .json({ error: `Author with id ${id} does not exist` });
    }

    return res.json(author);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* ======================
   CREATE author
====================== */
router.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !email) {
    return res
      .status(400)
      .json({ error: "firstName and email are required" });
  }

  try {
    const [result] = await db
      .insert(authorTable)
      .values({ firstName, lastName, email })
      .returning({ id: authorTable.id });

    return res.status(201).json({
      message: `Author has been created with ID ${result.id}`,
      id: result.id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
