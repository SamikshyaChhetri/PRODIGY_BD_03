import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../index.js";
import { createSchema, loginSchema } from "./validator.js";

export const registerController = async (req, res) => {
  try {
    const result = createSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).send({
        message: "Invalid data",
        error: result.error,
      });
    }

    const { name, email, password, address, role } = result.data;
    const prevEmail = prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (prevEmail) {
      return res.status(400).send({
        message: "Email already exist",
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name,
        address,
        email,
        password: hashedPassword,
        role,
      },
    });
    return res.status(201).send({
      message: "User created successfully",
      data: createdUser,
      status: 201,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error",
      status: 500,
      error: err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const loginResult = loginSchema.safeParse(req.body);
    if (!loginResult.success) {
      return res.status(400).send({
        message: "Invalid Data",
        error: loginResult.error,
        status: 400,
      });
    }
    const { email, password } = loginResult.data;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).send({
        message: "Email not found",
        status: 404,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).send({
        message: "Invalid credential ",
        status: 400,
      });
    }
    const token = jwt.sign({ userId: user.id }, "sam");
    await prisma.token.create({
      data: {
        token,
        userId: user.id,
      },
    });
    res.cookie("token", token);
    return res.status(200).send({
      message: "Login successful",
      status: 200,
      data: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Internal server error",
      status: 500,
      error: err,
    });
  }
};
