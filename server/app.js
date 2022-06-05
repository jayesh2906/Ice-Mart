import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/user", userRouter);
app.use("/product", productRouter);

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `Server Running on Port: http://localhost:${process.env.PORT}`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
