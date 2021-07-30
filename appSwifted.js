const express = require("express");
const userProfileRoute = require("./route/userProfile.routes");
const productRoute = require("./route/product.routes");
const cartRoute = require("./route/cart.routes");
const orderRoute = require("./route/order.routes");
const cors = require("cors");
const path = require('path')

// constants
const PORT = 90;
const MONGO_URI = "mongodb://127.0.0.1:27017/swifted_database";

// database
const connectDB = require("./database/database");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/images',express.static(path.join(__dirname,'/images')))
app.use("/swiftedAPI/userProfile", userProfileRoute);
app.use("/swiftedAPI/products", productRoute);
app.use("/swiftedAPI/cart", cartRoute);
app.use("/swiftedAPI", orderRoute);

app.listen(PORT, (err) => {
  if (err) throw err;

  connectDB(MONGO_URI);
  console.log(`API started at port: ${PORT}`);
});
