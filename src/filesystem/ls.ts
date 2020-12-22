import path from "path";

import { Command, CommandResult } from "shlep";

import { Dispatch, State } from "../context";

import { fs } from "./getfs";

export function ls(command: Command, dispatch: Dispatch, state: State): CommandResult {
  const {
    terminal: { cwd },
  } = state;

  const { arguments: args } = command;

  let filepath = "";
  if (args.length) {
    filepath = path.resolve(cwd, args[0]);
  } else {
    filepath = cwd;
  }

  const node = fs().find(filepath);
  if (!node) {
    return {
      exitCode: 1,
      output: `ls: ${args[0]}: no such file or directory`,
    };
  } else {
    if (node.isDir()) {
      const names = (node.children && node.children.map(node => node.name).join("\t")) || "";
      return {
        exitCode: 0,
        output: names,
      };
    } else {
      return {
        exitCode: 0,
        output: node.name,
      };
    }
  }
}
