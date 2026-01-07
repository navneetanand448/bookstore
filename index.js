const express = require("express");
const app = express();
const port = 8000;

const bookRouter = require("./router/book.route");

const authorRouter = require("./router/author.route");
console.log("AUTHOR ROUTER IMPORTED");
const { loggerMiddleware } = require("./middleware/logger");

app.use(express.json());
app.use(loggerMiddleware);

app.use("/books", bookRouter);
console.log("Author router loaded");
app.use("/authors", authorRouter); // ← MUST EXIST

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
