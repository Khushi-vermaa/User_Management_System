import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.JWT_SECRET);
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ message: "Admin only" });
  next();
};

export const isSubAdminOrAdmin = (req, res, next) => {
  if (["ADMIN", "SUB_ADMIN"].includes(req.user.role)) return next();
  res.status(403).json({ message: "Sub-Admin/Admin only" });
};

export const isSelfOrAdmin = (req, res, next) => {
  const targetId = parseInt(req.params.id);
  const loggedInUserId = parseInt(req.user.id);

  if (req.user.role === "ADMIN" || loggedInUserId === targetId) return next();

  res.status(403).json({ message: "Unauthorized" });
};
