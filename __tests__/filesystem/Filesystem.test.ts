import { Filesystem } from "../../src/filesystem";

describe("Filesystem", () => {
  const files = {
    "/usr/bin/echo": {},
    "/home/steve/test.txt": {},
  };

  const filesystem = new Filesystem(files);
});
