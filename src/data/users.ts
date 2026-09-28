import { readFileSync } from "fs";
import { join } from "path";

export type LoginCase = {
  name: string;
  username: string;
  password: string;
  expected: "success" | "locked";
};

export function loadUsers(): LoginCase[] {
  const file = join(process.cwd(), "src", "data", "users.json");
  return JSON.parse(readFileSync(file, "utf-8")) as LoginCase[];
}

export function standardUser(): LoginCase {
  const user = loadUsers().find((entry) => entry.expected === "success");
  if (!user) {
    throw new Error("users.json needs one case with expected set to success");
  }
  return user;
}
