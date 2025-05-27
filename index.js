import express from "express";
import router from "./features/auth/route.js";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
app.use(express.json());
app.use("/auth", router);
export const prisma = new PrismaClient();
app.listen(3000, () => {
  console.log("App is running");
});
