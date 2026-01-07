import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import userRouter from "./routes/user.js";
import { PORT } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', userRouter);

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;