import { Command, CommandResult } from "shlep";

import { Dispatch, State } from "../context";
import { fs } from "./getfs";
import { findOnPath } from "./findOnPath";

export function which(command: Command, dispatch: Dispatch, state: State): CommandResult {
  const {
    terminal: {
      env: { PATH },
    },
  } = state;

  const { arguments: args } = command;

  const results = args.reduce((arr: CommandResult[], arg: string): CommandResult[] => {
    const resolvedPath = findOnPath(PATH, arg);
    if (resolvedPath) {
      return [
        ...arr,
        {
          exitCode: 0,
          output: resolvedPath,
        },
      ];
    }

    arr.push({
      exitCode: 1,
      output: `${arg} not found`,
    });

    return arr;
  }, []);

  const exitCode = results.reduce((exitCode, r) => exitCode | r.exitCode, 0);
  const output = results.map(r => r.output).join("\n");

  return {
    exitCode,
    output,
  };
}
