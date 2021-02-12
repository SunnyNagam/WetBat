const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const db = require("./app/models");

const PORT = 8080;

var corsOptions = {
    origin: "http://localhost:3000"
};

db.sequelize.sync();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/quote.routes")(app);
app.listen(PORT, () => {
  console.log(`>> Server running on port ${PORT}.`);
});