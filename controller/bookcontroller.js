// This imports the WHOLE object { booksTable: ... }
const {booksTable, authorTable}= require('../models/index');
const db = require('../db');
const {author}=require('../models/author.model')
const { eq,ilike,sql } = require("drizzle-orm");
// ilike is a case-insensitive string matching operator in PostgreSQL.

// LIKE → case-sensitive  ILIKE → case-insensitive
exports.getAllBooks = async function(req, res) {
    const search=req.query.search;
    if(search){
      const books=await db
      .select()
      .from(booksTable)
      // .where(ilike(booksTable.title,`%${search}%`)) very slow  for large database
      .where(sql`to_tsvector('english', ${posts.title}) @@ to_tsquery('english', ${title})`);
      return res.json(books);
    }

    const books = await db.select().from(booksTable);
    return res.json(books);

};


// FIX: Added 'async' keyword
exports.getBooksbyId = async function(req, res) {
  const id = req.params.id;

  // FIX: Renamed variable to 'book' (singular) to match the return statement
  const [book] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id))
    .leftJoin(authorTable,eq(booksTable.authorId,authorTable.id)) // Simplified where clause
    .limit(1);

  if (!book) {
    return res.status(404).json({ error: `book with ${id} does not exist` });
  }
  return res.json(book);
};

// FIX: Added 'async' keyword
exports.createBooks = async function(req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === "") {
    return res.status(400).json({ error: `title is required` });
  }

  try {
    const [result] = await db
      .insert(booksTable)
      .values({
        title,
        authorId,
        description,
      })
      .returning({
        id: booksTable.id,
      });

    return res.status(201).json({
        message: `book created successfully`,
        id: result.id
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// FIX: Added 'async' keyword
exports.deleteBook = async function(req, res) {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: `Book ${id} deleted successfully` });
};