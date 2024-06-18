import UserModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (request, response) => {
  const idofuser = request.params.id;

  try {
    const founduser = await UserModel.findById(idofuser);
    if (founduser) {
      const { password, ...otherDetails } = founduser._doc;

      response.status(200).json(otherDetails);
    } else {
      response.status(404).json("No such User");
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteUser = async (request, response) => {
  const idofuser = request.params.id;

  const { currentUserId, currentUserAdmin } = request.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(idofuser);
      response.status(200).json(" Deleted account successfully!");
    } catch (error) {
      response.status(500).json(err);
    }
  } else {
    response.status(403).json("no entry!");
  }
};

export const followUser = async (request, response) => {
  const idofuser = request.params.id;
  const { _id } = request.body;
  if (_id == idofuser) {
    response.status(403).json("no access");
  } else {
    try {
      const currentfollowUser = await UserModel.findById(idofuser);
      const currentFollowingUser = await UserModel.findById(_id);

      if (!currentfollowUser.followers.includes(_id)) {
        await currentfollowUser.updateOne({ $push: { followers: _id } });
        await currentFollowingUser.updateOne({
          $push: { following: idofuser },
        });
        response.status(200).json("followed!");
      } else {
        response.status(403).json("already following!");
      }
    } catch (error) {
      response.status(500).json(error);
    }
  }
};

export const getAllUsers = async (request, response) => {
  try {
    let allusers = await UserModel.find();
    allusers = allusers.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    response.status(200).json(allusers);
  } catch (error) {
    response.status(500).json(allusers);
  }
};

export const updateUser = async (request, response) => {
  const idofuser = request.params.id;
  const { _id, currentUserAdmin, password } = request.body;

  if (idofuser === _id) {
    try {
      if (password) {
        const salty = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(password, salty);
      }
      const founduser = await UserModel.findByIdAndUpdate(idofuser, request.body, {
        new: true,
      });
      const gentoken = jwt.sign(
        { username: founduser.username, id: founduser._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      response.status(200).json({ user : founduser, token : gentoken });
    } catch (err) {
		console.log(err)
      console.log(err)
      response.status(500).json(err);
    }
  } else {
    console.log("here!")
    response.status(403).json("no permission");
  }
};

export const unfollowUser = async (request, response) => {
  const foundid = request.params.id;
  const { _id } = request.body;

  if (_id === foundid) {
    response.status(403).json("not allowed");
  } else {
    try {
      const unFollowUser = await UserModel.findById(foundid);
      const uncurrentFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await uncurrentFollowingUser.updateOne({ $pull: { following: foundid } });
        response.status(200).json("no longer following!");
      } else {
        response.status(403).json("please follow in the first place");
      }
    } catch (error) {
      response.status(500).json(error);
    }
  }
};
