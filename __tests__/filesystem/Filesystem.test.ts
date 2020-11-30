import { Command, CommandResult } from "shlep";

import { Filesystem } from "../../src/filesystem";
import { State, Dispatch } from "../../src/redux";

describe("Filesystem", () => {
  it("adds all files to fs", () => {
    const files = {
      "/usr/bin/echo": (cmd: Command, dispatch: Dispatch, state: State): CommandResult => {
        return { exitCode: 0 };
      },
      "/usr/bin/null": null,
      "/home/steve/test.txt": null,
    };

    const filesystem = new Filesystem(files);

    const root = filesystem.find("/");
    expect(root.children.length).toEqual(2);

    const echo = filesystem.find("/usr/bin/echo");
    expect(echo).not.toBeNull();
    expect(echo.path()).toEqual("/usr/bin/echo");
    expect(echo.isDir()).toEqual(false);
  });
});
