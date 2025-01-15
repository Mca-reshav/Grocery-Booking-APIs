import { Request, Response } from "express";
import encryptService from "../services/encrypt.service";
import msg from "../utils/messages.utils";
import { error, log, success, tokenLog } from "../services/response.service";
import jwtService from "../services/jwt.service";
import { databaseService } from "../services/pg.service";
import { Op } from "sequelize";

export const userController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, contact, name, password } = req.body;
      const isExist = await databaseService.findOne({
        model: "UserDetails",
        query: {
          where: {
            [Op.or]: [{ contact }, { email }],
          },
          attributes: ["id"],
        },
      });

      if (isExist) {
        res.status(400).json(log(false, msg.user.ALREADY_EXIST));
        return;
      }

      const encPwd = await encryptService.hashPassword(password);

      const userEntry = await databaseService.create({
        model: "UserDetails",
        data: { name, email, contact, password: encPwd },
      });

      if (!userEntry) {
        res.status(500).json(log(false, msg.user.FAILED));
        return;
      }

      const getToken = await jwtService.generateJwt({ userId: userEntry.id });
      tokenLog(getToken.token);

      res.status(201).json(
        log(true, msg.user.REGISTER_DONE, {
          authToken: getToken.token,
        })
      );
    } catch (err) {
      error(err);
      res.status(500).json(log(false, msg.auth.INTERNAL_ERROR));
    }
  },
  async login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const getData = await databaseService.findOne({
          model: "UserDetails",
          query: { 
            where: { email: email },
            attributes: ["id", "password", "role"],
        },
        });
        console.log(getData)
        const userId = getData?.id;
        if (!userId) {
            res.json(log(false, msg.user.NOT_REG));
            return;
        }
    
        const checkPwd = await encryptService.comparePassword(
          password,
          getData.password
        );
        if (!checkPwd) {
            res.json(log(false, msg.user.WRONG_PASSWORD));
            return
        }
    
        const getToken = await jwtService.generateJwt({ userId, role: getData.role });
        tokenLog(getToken.token);
        success(true, msg.user.LOGGED_IN);
        res.json(log(true, msg.user.LOGGED_IN, {authToken: getToken.token, userId: userId, role: getData.role}));
      } catch (err) {
        error(err);
      }
  }
};
