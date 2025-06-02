import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export const isAdmin = async (req, res, next) => {
  try {
    const cookie = req.cookies.token;
    const decodedCookie = jwt.decode(cookie);
    console.log(decodedCookie);
    const userid = decodedCookie.userId;
    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });
    if (!user) {
      return res.status(401).send({
        message: "User not found",
      });
    }
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).send("Only admin is authorized");
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Only admin is authorised",
    });
  }
};
