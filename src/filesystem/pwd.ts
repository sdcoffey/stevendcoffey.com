import { Command, CommandResult } from "shlep";

import { Dispatch, State } from "../context";

export function pwd(command: Command, dispatch: Dispatch, state: State): CommandResult {
  return {
    exitCode: 0,
    output: state.terminal.cwd,
  };
}
