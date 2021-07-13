const express = require("express");
const userProfileRoute = require("./route/userProfile.routes");
const productRoute = require("./route/product.routes");
const cors = require('cors');

// constants
const PORT = 90;
const MONGO_URI = "mongodb://127.0.0.1:27017/swifted_database";

// database
const connectDB = require("./database/database");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/swiftedAPI/userProfile", userProfileRoute);
app.use("/swiftedAPI/products", productRoute);

app.listen(PORT, (err) => {
  if (err) throw err;

  connectDB(MONGO_URI);
  console.log(`API started at port: ${PORT}`);
});
