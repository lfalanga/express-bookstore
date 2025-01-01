import "dotenv/config";

class GreetingsController {
  constructor() {}

  home(req, res) {
    try {
      res
        .status(200)
        .json({ message: `${process.env.APP_NAME}: greetings: home.` });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  hi(req, res) {
    try {
      res
        .status(200)
        .json({ message: `${process.env.APP_NAME}: greetings: hi.` });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }

  goodbye(req, res) {
    try {
      res
        .status(200)
        .json({ message: `${process.env.APP_NAME}: greetings: goodbye.` });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${process.env.APP_NAME}: ${err.message}.` });
    }
  }
}

export default new GreetingsController();
