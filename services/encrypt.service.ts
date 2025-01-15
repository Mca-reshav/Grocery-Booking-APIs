import bcrypt from "bcrypt";
import { error } from "./response.service";

const encryptService = {
  /**
   * Hashes a plain text password.
   * @param password - The plain text password.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string | void> {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (err: any) {
      error(`Error hashing password: ${err.message}`);
    }
  },

  /**
   * Compares a plain text password with a hashed password.
   * @param plainPassword - The plain text password.
   * @param hashedPassword - The hashed password.
   * @returns A promise that resolves to true if passwords match, false otherwise.
   */
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean | void> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err: any) {
      error(`Error comparing password: ${err.message}`);
    }
  },
};

export default encryptService;
