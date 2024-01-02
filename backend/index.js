import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./routes/userRouter.js";
import { blogsRouter } from "./routes/blogRouter.js";

// Dotenv config
dotenv.config();

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/user', userRouter)
app.use('/blogs', blogsRouter)

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`MongoDB connected successfully`.bgGreen.white);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
  });

// Port
const Port = process.env.PORT || 4000;

// Listen
app.listen(Port, () => {
  console.log(`Server is running on port: ${Port}`.bgCyan.white);
});
