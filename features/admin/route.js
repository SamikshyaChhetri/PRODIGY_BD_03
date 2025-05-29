import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin";
import { isUser } from "../../middleware/isUser";

export const adminRouter = Router();
adminRouter.get("/", isUser, isAdmin, (req, res) => {
  res.send("This is admin route");
});
