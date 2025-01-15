import dotenv from 'dotenv';

dotenv.config();

interface PgConfig {
  protocol: string; 
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number | undefined;
  logging: boolean;
  dialect: string; // Add dialect property
}

interface JwtConfig {
  secretKey: string | undefined;
  expiresIn: string | undefined;
}

interface Config {
  port: string | undefined;
  jwtConfig: JwtConfig;
  pgConfig: PgConfig;
  webPageDomain: string[];
}

const config: Config = {
  port: process.env.PORT,
  
  jwtConfig: {
    secretKey: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  pgConfig: {
    protocol: "postgres",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    logging: false,
    dialect: "postgres", // Add dialect here
  },
  
  webPageDomain: ['*'], 
};

export default config;
