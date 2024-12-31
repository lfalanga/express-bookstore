import "dotenv/config";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./data/bookstore.js";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(""));

// initialize
console.log(`[app]: ${process.env.APP_NAME}.`);
console.log(`[author]: ${process.env.APP_AUTHOR}.`);

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// end points
// home
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: `${process.env.APP_NAME}: bookstore: home.` });
});
// create
app.post("/books", (req, res) => {
  const created = { id: db.books.length, ...req.body };
  const index = db.books.findIndex((book) => book.isbn === created.isbn);
  if (db.books[index])
    res.status(404).json({
      message: `${process.env.APP_NAME}: bookstore: book already exists.`,
    });
  else {
    db.books.push(created);
    res.status(201).json(created);
  }
});
// all
app.get("/books", (req, res) => {
  res.status(200).json(db.books);
});
// get
app.get("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = db.books.find((book) => book.isbn === isbn);
  if (book) res.json(book);
  else
    res.status(404).json({
      message: `${process.env.APP_NAME}: bookstore: book not found.`,
    });
});
// update via put
app.put("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const index = db.books.findIndex((book) => book.isbn === isbn);
  if (db.books[index]) {
    const data = { ...req.body };
    delete data.isbn;
    delete data.id;
    const updated = { id: db.books[index].id, isbn: isbn, ...data };
    db.books[index] = updated;
    res.json(updated);
  } else
    res
      .status(404)
      .json({ message: `${process.env.APP_NAME}: bookstore: book not found.` });
});
// update via post
app.post("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const index = db.books.findIndex((book) => book.isbn === isbn);
  if (db.books[index]) {
    const data = { ...req.body };
    delete data.isbn;
    delete data.id;
    const updated = { id: db.books[index].id, isbn: isbn, ...data };
    db.books[index] = updated;
    res.status(200).json(updated);
  } else
    res
      .status(404)
      .json({ message: `${process.env.APP_NAME}: bookstore: book not found.` });
});
// delete
app.delete("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const index = db.books.findIndex((book) => book.isbn === isbn);
  if (db.books[index]) {
    db.books.splice(index, 1);
    res
      .status(200)
      .json({ message: `${process.env.APP_NAME}: bookstore: book deleted.` });
  } else
    res
      .status(404)
      .json({ message: `${process.env.APP_NAME}: bookstore: book not found.` });
});
// new-book.html
app.get("/new-book", (req, res) => {
  const html = path.join(__dirname, "pages/new-book.html");
  res.status(200).sendFile(html);
});
// book-list.html
app.get("/book-list", (req, res) => {
  const html = path.join(__dirname, "pages/book-list.html");
  res.status(200).sendFile(html);
});
// book-list.html
app.get("/pages/scripts/book-list.js", (req, res) => {
  const js = path.join(__dirname, "pages/scripts/book-list.js");
  res.status(200).sendFile(js);
});

// http server
try {
  app.listen(port, () => {
    console.log(`[http]: listening at ${process.env.APP_URL}:${port}.`);
  });
} catch (err) {
  console.log(`[error]: ${err}.`);
}
