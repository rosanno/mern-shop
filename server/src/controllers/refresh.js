import User from '../models/user.js';
import dotenv from 'dotenv';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies?.refreshToken;
  res.clearCookie('refreshToken', {
    httpOnly: true,
    samteSite: 'None',
    secure: true,
  });

  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log('attempted refresh token reuse!');
        const hackedUser = await User.findOne({ _id: decoded.user });
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    );
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        console.log('expired refresh token');
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }

      if (err || foundUser._id.toString() !== decoded.user)
        return res.sendStatus(403);

      // Refresh token was still valid
      const data = foundUser;
      const accessToken = generateAccessToken(data);

      const newRefreshToken = generateRefreshToken(data);
      const { password, ...user } = foundUser._doc;

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ user, accessToken });
    }
  );
};

export { handleRefreshToken };
