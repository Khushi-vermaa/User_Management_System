import express from "express";
import {
  registerUser,
  loginUser,
  getAlluser,
  getuserProfile,
  updateuserProfile,
  deleteUser,
} from "../controllers/auth.controller.js";
const router = express.Router();
import {
  verifyToken,
  isAdmin,
  isSubAdminOrAdmin,
  isSelfOrAdmin,
} from "../middlewares/verifyuser.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
// protected routes
router.get("/users", verifyToken, isSubAdminOrAdmin, getAlluser);
router.get("/profile/:id", verifyToken, isSelfOrAdmin, getuserProfile);
router.put("/user/:id", verifyToken, isSelfOrAdmin, updateuserProfile);
router.delete("/user/:id", verifyToken, isSubAdminOrAdmin, deleteUser);

export default router;
