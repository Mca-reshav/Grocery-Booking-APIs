import jwt from "jsonwebtoken";
import config from "../config/dev.config";

interface JwtData {
  [key: string]: any;
}

interface VerifyJwtResponse {
  status: boolean;
  jwtData?: any;
}

export default {
  generateJwt: async (data: JwtData): Promise<{ status: boolean; token: string }> => {
    return new Promise((resolve) => {
      const jwtData = jwt.sign(data, config.jwtConfig.secretKey as string, {
        expiresIn: config.jwtConfig.expiresIn,
      });

      resolve({
        status: true,
        token: jwtData,
      });
    });
  },

  verifyJwt: async (token: string): Promise<VerifyJwtResponse> => {
    return new Promise((resolve) => {
      try {
        const decoded = jwt.verify(token, config.jwtConfig.secretKey as string);
        resolve({
          status: true,
          jwtData: decoded,
        });
      } catch (error) {
        resolve({
          status: false,
        });
      }
    });
  },

  extractBearerToken: (authorizationHeader: string | undefined): string | false => {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return false;
    }
    return authorizationHeader.substring(7); 
  },
};
