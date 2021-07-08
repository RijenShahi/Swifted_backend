const express = require("express");
const userProfileRoute = require("./route/userProfile.routes");

// constants
const PORT = 90;
const MONGO_URI = "mongodb://127.0.0.1:27017/swifted_database";

// database
const connectDB = require("./database/database");

const app = express();
app.use(express.json());

app.use("/swiftedAPI/userProfile", userProfileRoute);

app.listen(PORT, (err) => {
  if (err) throw err;

  connectDB(MONGO_URI);
  console.log(`API started at port: ${PORT}`);
});
