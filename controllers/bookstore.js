import "dotenv/config";
import db from "../data/bookstore.js";
import path from "path";
import { errorRes, successRes } from "../common/response.js";

const __dirname = path.resolve(path.dirname(""));

class BookstoreController {
  constructor() {}

  home(req, res) {
    try {
      successRes(res, `${process.env.APP_NAME}: home.`);
    } catch (err) {
      errorRes(res, err);
    }
  }

  all(req, res) {
    try {
      successRes(res, db.books);
    } catch (err) {
      errorRes(res, err);
    }
  }

  get(req, res) {
    try {
      const { isbn } = req.params;
      const book = db.books.find((book) => book.isbn === isbn);
      if (book) successRes(res, book);
      else {
        errorRes(res, new Error("not found"), `book: not found.`, 404);
      }
    } catch (err) {
      errorRes(res, err);
    }
  }

  create(req, res) {
    try {
      const data = { ...req.body };
      delete data.id;
      const created = { id: db.books.length, ...data };
      const index = db.books.findIndex((book) => book.isbn === created.isbn);
      if (db.books[index]) {
        errorRes(res, new Error("conflict"), `book: already exists.`, 409);
      } else {
        db.books.push(created);
        successRes(res, created, 201);
      }
    } catch (err) {
      errorRes(res, err);
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
        successRes(res, updated);
      } else
        errorRes(res, new Error("not found"), `book: not found.`, 404);
    } catch (err) {
      errorRes(res, err);
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
        successRes(res, updated);
      } else
        errorRes(res, new Error("not found"), `book: not found.`, 404);
    } catch (err) {
      errorRes(res, err);
    }
  }

  delete(req, res) {
    try {
      const { isbn } = req.params;
      const index = db.books.findIndex((book) => book.isbn === isbn);
      if (db.books[index]) {
        db.books.splice(index, 1);
        successRes(res, `book: deleted.`);
      } else
        errorRes(res, new Error("not found"), `book: not found.`, 404);
    } catch (err) {
      errorRes(res, err);
    }
  }
}

export default new BookstoreController();
