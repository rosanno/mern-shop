import User from '../models/user.js';

export const logout = async (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  try {
    if (!cookies.refreshToken) return res.sendStatus(204);
    const refreshToken = cookies.refreshToken;

    const foundUser = await await User.findOne({ refreshToken });

    if (!foundUser) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};
