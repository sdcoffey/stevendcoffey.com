import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

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

const Terminal = (): JSX.Element => {
  const dispatch = useDispatch();
  const { cwd, inputs, currentInput } = useSelector(
    (state: State) => state.terminal
  );

  const handleKeyDown = (
    input: CurrentInput,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const key = event.key.toLowerCase();

    if (event.ctrlKey) {
      switch (key) {
        case "a":
          dispatch(setCursorIndex(0));
          break;
        case "e":
          dispatch(setCursorIndex(currentInput.value.length));
          break;
        case "u":
          dispatch(clearCurrentInput());
          break;
        default:
      }
    } else {
      switch (key) {
        case "enter":
          event.preventDefault();
          dispatch(submit());
          break;
        case "arrowleft":
          dispatch(setCursorIndex(input.cursorIndex - 1));
          break;
        case "arrowright":
          dispatch(setCursorIndex(input.cursorIndex + 1));
          break;
        default:
      }
    }
  };

  return (
    <div className="Terminal">
      <div className="Terminal--rows">
        {inputs.map(pair => (
          <div key={pair.timestamp.toString()}>
            <InputRow
              cwd={cwd}
              cursorIndex={pair.input.length - 1}
              onKeyDown={handleKeyDown}
              onChange={value => dispatch(setCurrentInput(value))}
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
          onChange={value => dispatch(setCurrentInput(value))}
          value={currentInput.value}
        />
      </div>
    </div>
  );
};

export default Terminal;
