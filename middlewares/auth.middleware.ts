import { Request, Response, NextFunction } from 'express';
import jwtService from "../services/jwt.service";
import { log } from '../services/response.service';
import msg from "../utils/messages.utils";

interface CustomRequest extends Request {
  user?: any; 
}

export default async function webAuth(
  req: CustomRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(403).json(log(false, msg.auth.AUTH_HEADER));
    return;
  }

  try {
    const token = jwtService.extractBearerToken(authHeader) || '';
    const verifyJwtData = await jwtService.verifyJwt(token);

    if (!verifyJwtData.status) {
      res.status(403).json(log(false, msg.auth.NOT_VERIFIED));
      return;
    }

    req.headers.user = verifyJwtData.jwtData;
    next(); 
  } catch (err) {
    res.status(403).json(log(false, msg.auth.INTERNAL_ERROR));
  }
}
