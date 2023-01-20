const mongoose = require("mongoose");
const config = require("./config");

const connectDb = async () => {
  // const con = await mongoose.connect(config.connectionString);
  const con = await mongoose.connect(process.env.CONNECTION_STRING);
  console.log(`MongoDB connection established : ${con.connection.host}`);
};

module.exports = connectDb;
