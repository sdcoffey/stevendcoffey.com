import { echo, pwd, ls, which } from "../bin";
import { Filesystem, FilesystemNode } from "./Filesystem";
import { Executable } from "./types";

const files = {
  "/bin/pwd": pwd,
  "/bin/echo": echo,
  "/bin/ls": ls,
  "/bin/which": which,
  "/home/steve/resume.txt": null,
};

let _fs: Filesystem | null = null;

function fs(): Filesystem {
  if (_fs) {
    return _fs;
  } else {
    _fs = new Filesystem(files);
    return _fs;
  }
}

export { Executable, Filesystem, FilesystemNode, fs };
