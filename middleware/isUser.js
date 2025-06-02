import jwt from "jsonwebtoken";
import { prisma } from "../index.js";

export const isUser = async (req, res, next) => {
  try {
    const cookie = req.cookies.token;
    const decodedCookie = jwt.decode(cookie);
    console.log(decodedCookie);
    const storedToken = await prisma.token.findFirst({
      where: {
        userId: decodedCookie.userId,
      },
    });
    if (!storedToken) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    if (cookie !== storedToken.token) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};
