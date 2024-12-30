import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// initialization
console.log(`[app]: ${process.env.APP_NAME}.`);
console.log(`[author]: ${process.env.APP_AUTHOR}.`);

// end points
// home
app.get("/", (req, res) => {
  res.send({ message: `${process.env.APP_NAME}: hello: home.` });
});

// http server
try {
  app.listen(port, () => {
    console.log(`[http]: listening at ${process.env.APP_URL}:${port}.`);
  });
} catch(err) {
  console.log(`[error]: ${err}.`);
}
