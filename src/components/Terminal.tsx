import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { CurrentInput } from "../redux/reducers/terminal";
import { State } from "../redux/reducers";
import {
  clearCurrentInput,
  setCurrentInput,
  setCursorIndex,
  submit
} from "../redux/actions/terminalActions";
import InputRow from "./InputRow";
import OutputRow from "./OutputRow";

import "../style/Terminal.scss";

const mapState = (state: State) => ({
  cwd: state.terminal.cwd,
  inputPairs: state.terminal.inputs,
  currentInput: state.terminal.currentInput,
  value: state.terminal.currentInput.value
});

const mapDispatch = {
  clearCurrentInput,
  setCurrentInput,
  setCursorIndex,
  submit
};

const connector = connect(
  mapState,
  mapDispatch
);

type TerminalProps = ConnectedProps<typeof connector>;

const Terminal = (props: TerminalProps) => {
  const {
    currentInput,
    cwd,
    inputPairs,
    setCursorIndex,
    setCurrentInput
  } = props;

  const handleKeyDown = (
    input: CurrentInput,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const key = event.key.toLowerCase();

    if (event.ctrlKey) {
      switch (key) {
        case "u":
          clearCurrentInput();
          break;
        default:
      }
    } else {
      switch (key) {
        case "enter":
          event.preventDefault();
          submit();

          break;
        case "arrowleft":
          setCursorIndex(input.cursorIndex - 1);
          break;
        case "arrowright":
          setCursorIndex(input.cursorIndex + 1);
          break;
        default:
      }
    }
  };

  return (
    <div className="Terminal">
      <div className="Terminal--rows">
        {inputPairs.map(pair => (
          <div key={pair.timestamp.toString()}>
            <InputRow
              cwd={cwd}
              cursorIndex={pair.input.length - 1}
              onKeyDown={handleKeyDown}
              onChange={setCurrentInput}
              active={false}
              value={pair.input}
            />
            {pair.output && <OutputRow>{pair.output}</OutputRow>}
          </div>
        ))}
        <InputRow
          active
          cwd={cwd}
          cursorIndex={currentInput.cursorIndex}
          onKeyDown={handleKeyDown}
          onChange={setCurrentInput}
          value={currentInput.value}
        />
      </div>
    </div>
  );
};

export default connector(Terminal);
