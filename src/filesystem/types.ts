import { Command, CommandResult } from "shlep";

import { State, Dispatch } from "../redux";

export type Executable = (command: Command, dispatch: Dispatch, state: State) => CommandResult;
