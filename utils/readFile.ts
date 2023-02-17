import fs from "fs";

// wrapper func
// dont throw away error
export function readInput(file: string): string {
  try {
    const data = fs.readFileSync(file, "utf-8");
    return data;
  } catch (err) {
    console.log(err);
    return "";
  }
}
