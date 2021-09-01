const express = require("express");
const userProfileRoute = require("./route/userProfile.routes");
const productRoute = require("./route/product.routes");
const cartRoute = require("./route/cart.routes");
const orderRoute = require("./route/order.routes");
const wishlistRoute = require("./route/wishlist.routes");
const ratingRoute = require('./route/ratingRoute')
const commentRoute = require('./route/commentRoute')
const replyRoute = require('./route/replyRoute')
const requestRoute = require('./route/requestRoute')
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv')


dotenv.config({
  "path":'./.env'
})

// constants
const PORT = 90;
const MONGO_URI = "mongodb://127.0.0.1:27017/swifted_database";

// database
const connectDB = require("./database/database");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/swiftedAPI/userProfile", userProfileRoute);
app.use("/swiftedAPI/products", productRoute);
app.use("/swiftedAPI/cart", cartRoute);
app.use("/swiftedAPI", orderRoute);
app.use("/swiftedAPI/wishlist", wishlistRoute);
app.use("/swiftedAPI/rating",ratingRoute)
app.use("/swiftedAPI/comment",commentRoute)
app.use("/swiftedAPI/request", requestRoute);
app.use('/swiftedAPI/reply', replyRoute);


app.listen(PORT, (err) => {
  if (err) throw err;

  connectDB(MONGO_URI);
  console.log(`API started at port: ${PORT}`);
});
