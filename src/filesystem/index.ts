import { echo, pwd } from "../bin";
import { Filesystem, File } from "./Filesystem";

export const PATH = "/usr/bin";

const filesystem: Record<string, File> = {
  "/usr/bin/pwd": {
    executable: pwd,
  },
  // "/usr/bin/echo": {
  //   executable: echo,
  // },
  // "/home/steve/resume.txt": {},
};

const RootNode = new Filesystem(filesystem);

export { RootNode, Filesystem };
