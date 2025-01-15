import express from "express";
import usersRoutes from "./user.routes";
import groceryRoutes from "./grocery.routes";

const router = express.Router();

// Route setup
router.use("/user", usersRoutes);
router.use("/grocery", groceryRoutes);

export default router;
