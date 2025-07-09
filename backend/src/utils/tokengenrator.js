import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.JWT_SECRET;
export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
