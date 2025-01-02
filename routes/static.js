import "dotenv/config";
import path from "path";
import express from "express";

const __dirname = path.resolve(path.dirname(""));

const router = express.Router();
router.get("/", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
  } catch (err) {
    res
      .status(500)
      .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
  }
});

router.get("/add", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/book-add.html"));
  } catch (err) {
    res
      .status(500)
      .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
  }
});

router.get("/list", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/book-list.html"));
  } catch (err) {
    res
      .status(500)
      .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
  }
});

router.get("/bootstrap", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/bootstrap.html"));
  } catch (err) {
    res
      .status(500)
      .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
  }
});

router.get("/redirect", (req, res) => {
  try {
    res.status(200).redirect('/foo.html');
  } catch (err) {
    res
      .status(500)
      .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
  }
});

export default router;
