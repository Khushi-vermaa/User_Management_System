import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend port
  })
);
app.get("/", async (req, res) => {
  res.send("Hello ");
});
app.use("/api", AuthRoutes);
export default app;
