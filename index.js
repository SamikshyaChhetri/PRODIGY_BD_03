import cookieParser from "cookie-parser";
import express from "express";
import router from "./features/auth/route.js";
import profileRouter from "./features/profile/route.js";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", router);
app.use("/profile", profileRouter);
export const prisma = new PrismaClient();
app.listen(3000, () => {
  console.log("App is running");
});
