import dotenv from "dotenv";
dotenv.config();

let config: any;

if (process.env.NODE_ENV === "development") {
  import("./dev.config")
    .then((devConfig) => (config = devConfig))
    .catch((err) => console.error("Error loading development config:", err));
} else console.error("Conflict at node environment");

export default config;
