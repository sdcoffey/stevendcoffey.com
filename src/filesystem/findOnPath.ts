import path from "path";

import { fs } from "./getfs";

export function findOnPath(pathVar: string, executable: string): string | null {
  const splitPath = pathVar.split(":");
  for (let elem of splitPath) {
    const fullPath = path.join(elem, executable);

    const node = fs().find(fullPath);
    if (node) {
      return fullPath;
    }
  }

  return null;
}
