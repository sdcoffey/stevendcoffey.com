import path from "path";

import { Command, CommandResult } from "shlep";

import { Dispatch, HOME, State, updateCwd } from "../context";
import { fs } from "./getfs";

export function cd(command: Command, dispatch: Dispatch, state: State): CommandResult {
  const {
    terminal: { cwd },
  } = state;

  const target = command.arguments[0] || HOME;
  const newPath = path.resolve(cwd, target);

  const node = fs().find(newPath);
  if (!node) {
    return {
      exitCode: 1,
      output: `no such file or directory: ${target}`,
    };
  } else if (!node.isDir()) {
    return {
      exitCode: 1,
      output: `not a directory: ${target}`,
    };
  }

  dispatch(updateCwd(newPath));
  return {
    exitCode: 0,
  };
}
