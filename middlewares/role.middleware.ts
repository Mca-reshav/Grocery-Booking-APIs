import msg from "../utils/messages.utils";
import { log } from "../services/response.service";
import { Request, Response, NextFunction } from "express";
import { databaseService } from "../services/pg.service";
import common from "../services/common.service";
import {permissibleRole} from '../utils/constants.utils';

interface CheckRole {
  role: number;
}

export default (requiredRole: number) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = common.getUserData(req);

      const checkRole: CheckRole | null = await databaseService.findOne({
        model: "UserDetails",
        query: {
          where: { id: user.id || user.userId },
          attributes: ["role"],
        },
      });

      if (!checkRole?.role) {
        res.status(400).json(log(false, msg.auth.ROLE_NOT_FOUND));
        return;
      }

      if (permissibleRole[requiredRole]?.includes(checkRole.role)) {
        return next();
      }

      res.status(403).json(log(false, msg.auth.UNAUTH));
    } catch (error) {
      next(error); 
    }
  };
};
