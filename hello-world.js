import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

console.log(`[app]: ${process.env.APP_NAME}.`);
console.log(`[author]: ${process.env.APP_AUTHOR}.`);

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME}: home.`);
});

app.listen(port, () => {
  console.log(`[http]: listening at ${process.env.APP_URL}:${port}.`);
});
