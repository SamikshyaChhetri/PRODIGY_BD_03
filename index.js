import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
app.use(express.json());
export const prisma = new PrismaClient();
app.listen(3333, () => {
  console.log("App is running");
});
