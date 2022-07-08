const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/entries", (req, res) => {
  db.query("SELECT * FROM  music", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add", (req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const artist = req.body.artist;
  const date = req.body.releasedate;
  const notes = req.body.notes;

  db.query(
    "INSERT INTO music (title, type, artist, releasedate, notes) VALUES (?,?,?,?,?)",
    [title, type, artist, date, notes],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const name = req.params.id;
  const sqlDelete = "DELETE FROM music WHERE title = ?";

  db.query(sqlDelete, name, (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
