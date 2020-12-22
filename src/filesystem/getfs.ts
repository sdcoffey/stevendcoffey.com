import { HOME } from "../context";
import { Filesystem } from "./Filesystem";
import { cat } from "./cat";
import { cd } from "./cd";
import { echo } from "./echo";
import { ls } from "./ls";
import { pwd } from "./pwd";
import { which } from "./which";

const files = {
  "/bin/cd": cd,
  "/bin/echo": echo,
  "/bin/ls": ls,
  "/bin/pwd": pwd,
  "/bin/which": which,
  "/bin/cat": cat,
  "/home/steve/resume.txt": null,
};

let _fs: Filesystem | null = null;

export function fs(): Filesystem {
  if (_fs) {
    return _fs;
  } else {
    _fs = new Filesystem(files);
    return _fs;
  }
}
