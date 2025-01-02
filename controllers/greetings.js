import "dotenv/config";
import path from "path";
import { errorRes, successRes } from "../common/response.js";

const __dirname = path.resolve(path.dirname(""));

class GreetingsController {
  constructor() {}

  home(req, res) {
    try {
      successRes(res, `${process.env.APP_NAME}: greetings: home.`);
    } catch (err) {
      errorRes(res, err);
    }
  }

  hi(req, res) {
    try {
      successRes(res, `${process.env.APP_NAME}: greetings: hi.`);
    } catch (err) {
      errorRes(res, err);
    }
  }

  goodbye(req, res) {
    try {
      successRes(res, `${process.env.APP_NAME}: greetings: goodbye.`);
    } catch (err) {
      errorRes(res, err);
    }
  }
}

export default new GreetingsController();
