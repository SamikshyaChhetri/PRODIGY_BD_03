import { Router } from "express";
import { registerController } from "./controller.js";

const router = Router();
router.get("/register", registerController);
