const mongoose = require("mongoose");

// Database Connection
async function connect() {
    mongoose.set("strictQuery", false);
    await mongoose
    .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected ^-^"))
  .catch((err) => console.log(err));
}

module.exports = connect;