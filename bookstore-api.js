import "dotenv/config";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(""));

// initialize
console.log(`[app]: ${process.env.APP_NAME}.`);
console.log(`[author]: ${process.env.APP_AUTHOR}.`);

// were we will keep books
let books = [];

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// home
app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME}: home.`);
});

// end points
// create
app.post("/books", (req, res) => {
  const book = { id: books.length, ...req.body };
  books.push(book);
  res.send(book);
});
// all
app.get("/books", (req, res) => {
  res.json(books);
});
// get
app.get("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = books.find(book => book.isbn === isbn);
  if (book) res.json(book);
  else res.json(`${process.env.APP_NAME}: book: not found.`);
});
// update
app.post("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const index = books.findIndex(book => book.isbn === isbn);
  if (books[index]) {
    const data = { ...req.body };
    delete data.isbn;
    const updated = { id: books[index].id, isbn: isbn, ...data };
    books[index] = updated;
    res.json(updated);
  }
  else res.json(`${process.env.APP_NAME}: book: not found. ${index}`);
});
// delete
app.delete("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const index = books.findIndex(book => book.isbn === isbn);
  if (books[index]) {
    delete books[index];
    books = books.filter(book => book);
    res.json(`${process.env.APP_NAME}: book: deleted.`);
  }
  else res.json(`${process.env.APP_NAME}: book: not found.`);
});
// new-book.html
app.get("/new-book", (req, res) => {
  const html = path.join(__dirname, "pages/new-book.html");
  res.sendFile(html);
});
// book-list.html
app.get("/book-list", (req, res) => {
  const html = path.join(__dirname, "pages/book-list.html");
  res.sendFile(html);
});
// book-list.html
app.get("/pages/scripts/book-list.js", (req, res) => {
  const js = path.join(__dirname, "pages/scripts/book-list.js");
  res.sendFile(js);
});

// http server
app.listen(port, () => {
  console.log(`[http]: listening at ${process.env.APP_URL}:${port}.`);
});
