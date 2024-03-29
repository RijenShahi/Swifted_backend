const mongoose = require("mongoose");

module.exports = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};
