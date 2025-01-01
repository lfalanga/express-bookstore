import express from "express";
import greetingsController from "../controllers/greetings.js";

// end points
const router = express.Router();
router.route("/").get(greetingsController.home);
router.route("/hello").get(greetingsController.hi);
router.route("/goodbye").get(greetingsController.goodbye);

export default router;
