const mongoose = require("mongoose");

async function connectMongoDB(url, databaseName="demoDB") {
    try {
        await mongoose.connect(url,{dbName:databaseName,});
        console.log("Database connection established!");
    } catch (error) {
        console.log("Database connection failed to established!");
    }
  return await mongoose.connect(url);
}
module.exports = { connectMongoDB };
