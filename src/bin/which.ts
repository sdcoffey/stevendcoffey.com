import { Command, CommandResult } from "shlep";

import { Dispatch, State } from "../redux";

import { fs } from "../filesystem";

export function which(command: Command, dispatch: Dispatch, state: State): CommandResult {
  const {
    terminal: {
      env: { PATH },
    },
  } = state;

  const { arguments: args } = command;

  const splitPath = PATH.split(":");

  const results = args.reduce((arr: CommandResult[], arg: string): CommandResult[] => {
    for (let elem of splitPath) {
      const fullPath = elem + `/${arg}`;

      const node = fs().find(fullPath);
      if (node) {
        return [
          ...arr,
          {
            exitCode: 0,
            output: fullPath,
          },
        ];
      }
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
