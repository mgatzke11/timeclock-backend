const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let clockedInUsers = {}; // Stores who is clocked in

app.post("/clock-in", (req, res) => {
  const user = req.body.user;
  clockedInUsers[user] = true;
  res.json({ success: true });
});

app.get("/documents", (req, res) => {
  const user = req.query.user;
  if (!clockedInUsers[user]) {
    return res.status(403).json({ message: "Clock in first!" });
  }
  res.json({ documents: ["File1.pdf", "File2.pdf"] });
});

app.listen(3001, () => console.log("Backend running"));
