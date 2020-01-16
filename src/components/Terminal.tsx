import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { Dispatch } from "../redux/store";
import { CurrentInput, InputPair } from "../redux/reducers/terminal";
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
  currentInput: state.terminal.currentInput
});

const mapDispatch = {
  clearCurrentInput,
  setCurrentInput,
  setCursorIndex,
  submit
}

const connector = connect(
  mapState,
  mapDispatch
);

type TerminalProps = ConnectedProps<typeof connector> & {
  clearCurrentInput: typeof clearCurrentInput;
  currentInput: CurrentInput;
  cwd: string;
  inputPairs: InputPair[];
  submit: typeof submit;
  setCurrentInput: typeof setCurrentInput;
  setCursorIndex: typeof setCursorIndex;
}

function Terminal(props: TerminalProps) {
  const {
    clearCurrentInput,
    currentInput,
    cwd,
    inputPairs,
    setCurrentInput,
    setCursorIndex,
    submit
  } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toLowerCase();

    if (event.ctrlKey) {
      switch(key) {
        case "u":
          clearCurrentInput();
          break
      }
    } else {
      switch(key) {
      case "enter":
        event.preventDefault();
        submit();

        break;
      case "arrowleft":
        setCursorIndex(currentInput.cursorIndex - 1);
        break;
      case "arrowright":
        setCursorIndex(currentInput.cursorIndex + 1);
        break;
      default:
    }
  };

  const renderInputRow = (
    active: boolean,
    cursorIndex: number,
    input: string
  ) => (
    <InputRow
      cwd={cwd}
      cursorIndex={cursorIndex}
      onKeyDown={handleKeyDown}
      onChange={setCurrentInput}
      active={active}
      value={input}
    />
  );

  return (
    <div className="Terminal">
      <div className="Terminal--rows">
        {inputPairs.map(pair => (
          <div key={pair.timestamp.toString()}>
            {renderInputRow(false, pair.input.length - 1, pair.input)}
            {pair.output && <OutputRow>{pair.output}</OutputRow>}
          </div>
        ))}
        {renderInputRow(true, currentInput.cursorIndex, currentInput.value)}
      </div>
    </div>
  );
}

export default connector(Terminal);
