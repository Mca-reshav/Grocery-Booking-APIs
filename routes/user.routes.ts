import express from "express";
import { global, one } from "../middlewares/main.middleware";
import { userController } from "../modules/user.controller";
import userValidator from "../validators/user.validator";

const usersRoutes = express.Router();
usersRoutes.use(global);

usersRoutes.post("/register",one.validate(userValidator.register),userController.register);
usersRoutes.post("/login",one.validate(userValidator.login),userController.login);

usersRoutes.use("*", one._404);

export default usersRoutes;
