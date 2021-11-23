const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

//parse json content-type requests
app.use(bodyParser.json());

//parse url-form-encoded content-type requests
app.use(bodyParser.urlencoded({ extended: true }));

const Role = db.role;

db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to App Jb",
  });
});
// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
