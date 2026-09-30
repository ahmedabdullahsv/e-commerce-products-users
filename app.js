const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");

const api = process.env.API_URL;
console.log("API URL:", api);

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);

// connection

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Data Base connected"))
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log(api);
  console.log("server is running http//localserver:3000");
});
