import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (request, response) => {
  const { username, password } = request.body;

  try {
    const customer = await UserModel.findOne({ username: username });

    if (customer) {
      const validity = await bcrypt.compare(password, customer.password);

      if (!validity) {
        response.status(400).json("Wrong Password");
      } else {
        const token = jwt.sign(
          { username: customer.username, id: customer._id },
          process.env.JWTKEY,
          { expiresIn: "3h" }
        );
        response.status(200).json({ user : customer, token });
      }
    }
  } catch (err) {
	console.log(err)
    response.status(500).json(err);
  }
};

export const registerUser = async (request, response) => {
  const salty = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salty);
  request.body.password = hashedPassword;
  const newAccount = new UserModel(request.body);
  const { username } = request.body;
  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return response.status(400).json({ message: "User already exists..." });

    const newCustomer = await newAccount.save();
    const gentoken = jwt.sign(
      { username: newCustomer.username, id: newCustomer._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    response.status(200).json({ user : newCustomer, token : gentoken });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
