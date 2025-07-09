import { hashpassowrds, comparePassword } from "../utils/hashpassword.js";
import { generateToken } from "../utils/tokengenrator.js";
import prisma from "../utils/prisma.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existinguser = await prisma.user.findUnique({
      where: { email },
    });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await hashpassowrds(password);
    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashpassword,
        role,
      },
    });
    res.status(201).json({ message: "User created", user: newuser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userexist = await prisma.user.findUnique({
      where: { email },
    });
    if (!userexist) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await comparePassword(password, userexist.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken({ id: userexist.id, role: userexist.role });
    return res.status(200).json({ token, userexist });
  } catch (err) {
    return res.status(400).json({ message: "User already exists" });
  }
};

// export const getAlluser = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users);
//   } catch (err) {
//     return res.status(400).json({ message: "Users not  exists" });
//   }
// };
// GET /users?search=&role=&page=&limit=
export const getAlluser = async (req, res) => {
  try {
    const { search = "", role = "", page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
              ],
            }
          : {},
        role ? { role } : {}, // optional role filter
      ],
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getuserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ message: "Users not  exists" });
  }
};
export const updateuserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ message: "Users not  exists" });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: parseInt(id) } });
  res.status(200).json({ message: "User deleted" });
};
