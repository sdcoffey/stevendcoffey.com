import * as React from "react";
import { connect } from "react-redux";

import { Dispatch } from "../redux/store";
import { InputPair } from "../redux/reducers/terminal";
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

interface TerminalProps {
  clearCurrentInput?: typeof clearCurrentInput;
  cursorIndex: number;
  cwd: string;
  inputPairs: InputPair[];
  submit?: typeof submit;
  setCurrentInput?: typeof setCurrentInput;
  setCursorIndex?: typeof setCursorIndex;
  value: string;
}

function Terminal(props: TerminalProps) {
  const {
    clearCurrentInput,
    cursorIndex,
    cwd,
    inputPairs,
    setCurrentInput,
    setCursorIndex,
    submit,
    value
  } = props;

  const handleRowChange = (newValue: string) => {
    setCurrentInput && setCurrentInput(newValue);
  };

  const handleRowSubmit = () => {
    submit && submit();
  };

  const handleClearCurrentInput = () => {
    clearCurrentInput && clearCurrentInput();
  };

  const handleCursorIndexChange = (newIndex: number) => {
    setCursorIndex && setCursorIndex(newIndex);
  };

  const renderInputRow = (
    active: boolean,
    cursorIndex: number,
    input: string
  ) => (
    <InputRow
      cwd={cwd}
      cursorIndex={cursorIndex}
      onSubmit={handleRowSubmit}
      onChange={handleRowChange}
      onClearCurrentInput={handleClearCurrentInput}
      onCursorIndexChange={handleCursorIndexChange}
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
        {renderInputRow(true, cursorIndex, value)}
      </div>
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  cwd: state.terminal.cwd,
  inputPairs: state.terminal.inputs,
  value: state.terminal.currentInput.value,
  cursorIndex: state.terminal.currentInput.cursorIndex
});

const mapDispatch = (dispatch: Dispatch) => ({
  clearCurrentInput: (value: string) => dispatch(clearCurrentInput()),
  setCurrentInput: (value: string) => dispatch(setCurrentInput(value)),
  setCursorIndex: (index: number) => dispatch(setCursorIndex(index)),
  submit: () => dispatch(submit())
});

export default connect(
  mapStateToProps,
  mapDispatch
)(Terminal);
