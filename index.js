import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load the environment variables
dotenv.config();

/**

1. import.meta.url gives the module’s own location — as a file URL

When you’re using ES modules (import/export), Node internally treats every module as a URL, not just a plain file path.

So, inside your server.js, if you print it:

console.log(import.meta.url);

You’ll see something like:

file:///home/mark/project/server.js


That’s a file URL (note the file:/// prefix).
Node uses that under the hood to identify where each module came from.

2. fileURLToPath(import.meta.url) converts that URL into a normal filesystem path

So this:

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

turns the above:

file:///home/mark/project/server.js

into:

/home/mark/project/server.js

That’s a usable string path you can pass to things like path.join(), fs.readFile(), or res.sendFile().

*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the server
const app = express();
const port = process.env.PORT || 3000;
// Used to parse URL-encoded form data, making it accessible as a JavaScript object in req.body.
app.use(express.urlencoded({ extended: true }));

const username = process.env.USERNAME || "username";
const password = process.env.PASSWORD || "password";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// When users hit the secret endpoint, index.html is served.
app.get("/secret", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/secret", (req, res) => {
  const { inputUsername, inputPassword } = req.body;

  if (inputUsername === username && inputPassword === password) {
    res.send(process.env.SECRET_MESSAGE);
  } else {
    res.send("Incorrect username or password, try again.");
  }
});

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
