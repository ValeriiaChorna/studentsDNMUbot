const mongoose = require("mongoose");

module.exports = {
  logStart() {
    console.log("Bot has been started");
  },

  debug(obj = {}) {
    return JSON.stringify(obj, null, 4);
  },

  async initDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log("MongoDB connection error", err);
      // process.exit(1);
    }
  },
};
