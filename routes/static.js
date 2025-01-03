import "dotenv/config";
import path from "path";
import express from "express";
import { errorRes, successRes } from "../common/response.js";

const __dirname = path.resolve(path.dirname(""));

// end points
const router = express.Router();
router.get("/", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
  } catch (err) {
    errorRes(res, err);
  }
});

router.get("/add", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/book-add.html"));
  } catch (err) {
    errorRes(res, err);
  }
});

router.get("/list", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/book-list.html"));
  } catch (err) {
    errorRes(res, err);
  }
});

router.get("/bootstrap", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/public/bootstrap.html"));
  } catch (err) {
    errorRes(res, err);
  }
});

router.get("/redirect", (req, res) => {
  try {
    res.status(200).redirect('/foo.html');
  } catch (err) {
    errorRes(res, err);
  }
});

export default router;
