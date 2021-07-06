const express = require("express");
const userProfileRoute = require("./route/userProfile.routes");
const database = require("./database/database");

// constants
const PORT = 90;
const MONGO_URI = "mongodb://localhost:27017/swifted_database";

const app = express();
app.use(express.json());

app.use(userProfileRoute);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`API started at port: ${PORT}`);
});
