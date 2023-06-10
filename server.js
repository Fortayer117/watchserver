const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./controllers/routes/auth")

dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.mongo_url)
  .then(() => console.log("db is running"))
  .catch((err) => console.log(err));
app.use("/api/",authRoute)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
