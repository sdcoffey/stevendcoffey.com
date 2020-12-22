import { Command, CommandResult } from "shlep";

import { State, Dispatch } from "../context";

export type Executable = (command: Command, dispatch: Dispatch, state: State) => CommandResult | Promise<CommandResult>;
