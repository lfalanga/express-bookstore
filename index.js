import "dotenv/config";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import greetingsRoutes from "./routes/greetings.js";
import bookstoreRoutes from "./routes/bookstore.js";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(""));

// initialize
console.log(`[app]: ${process.env.APP_NAME}.`);
console.log(`[author]: ${process.env.APP_AUTHOR}.`);

// middleware
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// end points
// home
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: `${process.env.APP_NAME}: home.` });
});
// greetings
app.use("/api/greetings", greetingsRoutes);
// bookstore
app.use("/api/books", bookstoreRoutes);

// http server
try {
  app.listen(port, () => {
    console.log(`[http]: listening at ${process.env.APP_URL}:${port}.`);
  });
} catch (err) {
  console.log(`[error]: ${err}.`);
}
