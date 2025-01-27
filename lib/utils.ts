import { customAlphabet } from "nanoid";
export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");
export function absoluteUrl(path: string) {
  return `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }${path}`;
}