import bcrypt from "bcrypt";
import { prisma } from "../../index.js";
import { createSchema } from "./validator.js";

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
    console.log(err);
    return res.status(500).send({
      message: "Internal server error",
      status: 500,
      error: err,
    });
  }
};

export const loginController = () => {};
