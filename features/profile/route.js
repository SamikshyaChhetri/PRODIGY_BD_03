import { Router } from "express";
import { isUser } from "../../middleware/isUser.js";

const router = Router();
router.get("/", isUser, (req, res) => {
  return res.send("This is profile route");
});
export default router;
