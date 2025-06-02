import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.js";
import { isUser } from "../../middleware/isUser.js";

const router = Router();
router.get("/", isUser, isAdmin, (req, res) => {
  return res.send("This is profile route");
});
export default router;
