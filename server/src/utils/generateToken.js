import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { user: user.id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1m",
    }
  );

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { user: user.id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
