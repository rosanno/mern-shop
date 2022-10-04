import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAccessToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    const accessToken = header.split(" ")[1];

    try {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, decoded) => {
          if (err) return res.sendStatus(403);

          req.userId = decoded.user;
          next();
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "Unauthorized acccess" });
  }
};

export { verifyAccessToken };
