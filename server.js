const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

const ENTRY_FILE = path.join(__dirname, "entries.json");
const ADMIN_PASSWORD = "letmein123"; // you can change this

app.use(express.static(__dirname)); // serves index.html
app.use(express.json());

app.post("/enter", (req, res) => {
  const { name, password } = req.body;
  const time = new Date().toISOString();

  // Load existing entries
  let entries = [];
  if (fs.existsSync(ENTRY_FILE)) {
    entries = JSON.parse(fs.readFileSync(ENTRY_FILE, "utf8"));
  }

  if (password === ADMIN_PASSWORD) {
    return res.json({ status: "admin", entries });
  }

  entries.push({ name, time });
  fs.writeFileSync(ENTRY_FILE, JSON.stringify(entries, null, 2));

  res.json({ status: "entered", message: `Welcome, ${name}! You’ve entered the room.` });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
