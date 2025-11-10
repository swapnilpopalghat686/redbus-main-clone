const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5009;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running at http://localhost:5009");
});

// GET all users
app.get("/users", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send({ error: "Cannot read users" });
    res.send(JSON.parse(data));
  });
});

// POST signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: "Email & password required" });

  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send({ error: "Cannot read users" });

    const users = JSON.parse(data);
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).send({ error: "User already exists" });

    users.push({ email, password });
    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send({ error: "Cannot save user" });
      res.send({ message: "Signup successful", user: { email } });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
