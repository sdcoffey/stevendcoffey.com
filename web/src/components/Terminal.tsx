import * as React from "react";
import { connect } from "react-redux";

import { Dispatch } from "../redux/store";
import { InputPair } from "../redux/reducers/terminal";
import { State } from "../redux/reducers";
import {
  clearCurrentInput,
  setCurrentInput
} from "../redux/actions/terminalActions";
import InputRow from "./InputRow";
import OutputRow from "./OutputRow";

import "../style/Terminal.scss";

interface TerminalProps {
  cwd: string;
  currentInput: string;
  inputPairs: InputPair[];
  clearCurrentInput?: typeof clearCurrentInput;
  setCurrentInput?: typeof setCurrentInput;
}

function Terminal(props: TerminalProps) {
  const {
    clearCurrentInput,
    currentInput,
    cwd,
    inputPairs,
    setCurrentInput
  } = props;

  const handleRowChange = (newValue: string) => {
    setCurrentInput && setCurrentInput(newValue);
  };

  const handleRowSubmit = () => {};

  const handleClearCurrentInput = () => {
    clearCurrentInput && clearCurrentInput();
  };

  const renderInputRow = (active: boolean, input: string) => (
    <InputRow
      cwd={cwd}
      onSubmit={handleRowSubmit}
      onChange={handleRowChange}
      onClearCurrentInput={handleClearCurrentInput}
      active={active}
      inputValue={input}
    />
  );

  return (
    <div className="Terminal">
      <div className="Terminal--rows">
        {inputPairs.map(pair => (
          <div key={pair.timestamp.toString()}>
            {renderInputRow(false, pair.input)}
            {pair.output && <OutputRow>{pair.output}</OutputRow>}
          </div>
        ))}
        {renderInputRow(true, currentInput)}
      </div>
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  cwd: state.terminal.cwd,
  inputPairs: state.terminal.inputs,
  currentInput: state.terminal.currentInput
});

const mapDispatch = (dispatch: Dispatch) => ({
  clearCurrentInput: (value: string) => dispatch(clearCurrentInput()),
  setCurrentInput: (value: string) => dispatch(setCurrentInput(value))
});

export default connect(
  mapStateToProps,
  mapDispatch
)(Terminal);
