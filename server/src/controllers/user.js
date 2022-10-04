import User from "../models/user.js";

const user = async (req, res) => {
  const userId = req.userId;

  try {
    const verifiedUser = await User.findOne({ _id: userId });

    if (!verifiedUser)
      return res.status(404).json({ message: "User not found" });

    const { password, ...user } = verifiedUser._doc;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export default user;
