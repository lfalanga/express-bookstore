import "dotenv/config";
import db from "../data/bookstore.js";

class BookstoreController {
  constructor() {}

  home(req, res) {
    try {
      res
        .status(200)
        .json({ message: `${process.env.APP_NAME}: bookstore: home.` });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  all(req, res) {
    try {
      res.status(200).json(db.books);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  get(req, res) {
    try {
      const { isbn } = req.params;
      const book = db.books.find((book) => book.isbn === isbn);
      if (book) res.status(200).json(book);
      else
        res.status(404).json({
          message: `${process.env.APP_NAME}: bookstore: book not found.`,
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  create(req, res) {
    try {
      const data = { ...req.body };
      delete data.id;
      const created = { id: db.books.length, ...data };
      const index = db.books.findIndex((book) => book.isbn === created.isbn);
      if (db.books[index])
        res.status(404).json({
          message: `${process.env.APP_NAME}: bookstore: book already exists.`,
        });
      else {
        db.books.push(created);
        res.status(201).json(created);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  updatePUT(req, res) {
    try {
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
        res.status(404).json({
          message: `${process.env.APP_NAME}: bookstore: book not found.`,
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  updatePOST(req, res) {
    try {
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
          .json({
            message: `${process.env.APP_NAME}: bookstore: book not found.`,
          });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  delete(req, res) {
    try {
      const { isbn } = req.params;
      const index = db.books.findIndex((book) => book.isbn === isbn);
      if (db.books[index]) {
        db.books.splice(index, 1);
        res.status(200).json({
          message: `${process.env.APP_NAME}: bookstore: book deleted.`,
        });
      } else
        res.status(404).json({
          message: `${process.env.APP_NAME}: bookstore: book not found.`,
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }
}

export default new BookstoreController();
