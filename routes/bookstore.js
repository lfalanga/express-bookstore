import express from "express";
import bookstoreController from "../controllers/bookstore.js";

// end points
const router = express.Router();
router
  .route("/")
  .get(bookstoreController.all)
  .post(bookstoreController.create);

router
  .route("/:isbn")
  .get(bookstoreController.get)
  .put(bookstoreController.updatePUT)
  .delete(bookstoreController.delete)
  .post(bookstoreController.updatePOST);

export default router;
