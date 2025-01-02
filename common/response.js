import "dotenv/config";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

export function errorRes(res, err, errMsg="failed operation.", statusCode=500) {
  if (Boolean(process.env.APP_DEBUG))
    console.error("[error]:", err);
  return res.status(statusCode).json({ success: false, error: errMsg });
}

export function successRes(res, data, statusCode=200) {
  return res.status(statusCode).json({ success: true, data });
}
