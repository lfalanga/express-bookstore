# express-bookstore: Node + Express

This template provides an arquitecture to develop a fake API REST.

# Resources

- [article](https://stackabuse.com/building-a-rest-api-with-node-and-express/)
- [node](https://nodejs.org/en)
- [yarn](https://classic.yarnpkg.com/en/)
- [express](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors) : Cross-Origin Resource Sharing.
- [article](https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files) : Deliver html files with express.
- [http](https://http.dev/) : Hyper Text Transfer Protocol.

# ToDos

- deploy application on render.
- implement bootstrap styling and check features.
- test running both instances hello-world and bookstore at index.js.
- rename bookstore-api.js to bookstore.js and change package.json script bookstore.
- implement put method for postman use cases.
- trap posting empty edit-book form.
- implement /api/books route.
- implement bookstore.json as initial API data.
- implement proper status codes for every response.
- do the tricky tests.
- leave id property and implement '/book/:isbn' for routes instead.
- prevent isbn modifications deleting the isbn property from req.body.
- all responses to JSON format.
- research about testing packages.
- add brief description to resources at README.md.
- implement w3.css.
- implement id property for book entity.
- validate existing book by key or name.
