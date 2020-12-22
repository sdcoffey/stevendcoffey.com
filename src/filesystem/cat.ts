import path from "path";

import { Command, CommandResult } from "shlep";

import { Dispatch, HOME, State, updateCwd } from "../context";
import { fs } from "./getfs";

export async function cat(command: Command, dispatch: Dispatch, state: State): Promise<CommandResult> {
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
  }

  const body = await node.read();
}
