import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.user = userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "you must be logged in" });
  }
};

export default auth;
