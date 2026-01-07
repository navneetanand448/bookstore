const express = require("express");
const router = express.Router();

const controller = require('../controller/bookcontroller');

router.get("/", controller.getAllBooks);

// FIX: Changed 'getAllBooksbyId' to 'getBooksbyId' to match the controller
router.get("/:id", controller.getBooksbyId);

router.post("/", controller.createBooks);
router.delete("/:id", controller.deleteBook);

module.exports = router;