import { Command, CommandResult } from "shlep";

export function echo(command: Command): CommandResult {
  return {
    output: command.arguments.join(" "),
    exitCode: 0,
  };
}
