import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import staticRoutes from "./routes/static.js";
import greetingsRoutes from "./routes/greetings.js";
import bookstoreRoutes from "./routes/bookstore.js";

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
// jquery
app.use(
  "/jquery/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
// bootstrap
app.use(
  "/bootstrap/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/bootstrap/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
// public
app.use(express.static(path.join(__dirname, "public")));
// app.use("/public", express.static(path.join(__dirname, "public")));
// friendly static routes
app.use("/bookstore", staticRoutes);
// foo
// dynamic path, but only match asset at specific segment
app.use("/foo/:foo/:bar/:asset", (req, res, next) => {
  req.url = req.params.asset;
  express.static(path.join(__dirname, "public"))(req, res, next);
});
// just the asset
app.use("/foo/*", (req, res, next) => {
  req.url = path.basename(req.originalUrl);
  express.static(path.join(__dirname, "public"))(req, res, next);
});

// end points
app.use("/api/greetings", greetingsRoutes);
app.use("/api/books", bookstoreRoutes);

// http server
try {
  app.listen(port, () => {
    console.log(`[http]: listening at ${process.env.APP_URL}:${port}.`);
  });
} catch (err) {
  console.log(`[error]: ${err}.`);
}
