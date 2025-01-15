import colors from "colors";
import moment from "moment";

// Enable color formatting for logs
colors.enable();

/**
 * Logs token information with success formatting
 */
export const tokenLog = (token: string): void => {
  console.log(`:: SUCCESS :: :: ${token}`.bgBlack);
};

/**
 * Logs success or error messages and invokes the log method
 */
export const success = (
  success: boolean = true,
  msg: string = "",
  data: Record<string, unknown> = {}
): void => {
  if (success) {
    console.log(`:: SUCCESS :: :: ${msg}`.green);
  } else {
    console.log(`:: ERROR :: :: ${msg}`.red);
  }
  log(success, msg, data);
};

/**
 * Logs error messages with bright red formatting
 */
export const error = (e: unknown): boolean => {
  console.log(`:: CATCH ERROR :: :: ${String(e)}`.bgRed);
  return false;
};

/**
 * General logging function for success and error cases
 */
export const log = (
  success: boolean = true,
  message: string = "",
  data: Record<string, unknown> = {}
): { success: boolean; message: string; data: Record<string, unknown> } => {
  if (!success) {
    console.log(`:: ERROR :: :: ${message}`.red);
  }
  return { success, message, data };
};

