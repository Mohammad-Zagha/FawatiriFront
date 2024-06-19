require("dotenv").config();
const express = require("express");
const { connectDB } = require("./DB/connection");
const appRouter = require("./moduels/index.router");
const app = express();
const port = 3000;
const BaseUrl = process.env.BaseUrl;
connectDB();
app.use(express.json({}));
app.use(`${BaseUrl}/User`, appRouter.userRouter);
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
