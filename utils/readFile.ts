import fs from "fs";

export function readInput(file: string): string {
  try {
    const data = fs.readFileSync(file, "utf-8");
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
}
