import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load the environment variables
dotenv.config();


// Serve static frontend files
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

app.get("/secret", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/secret", (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;

  if (inputUsername === username && inputPassword === password) {
    res.send(process.env.SECRET_MESSAGE);
  } else {
    res.send("Incorrect username or password, try again.");
  }
});

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});