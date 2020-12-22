import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CurrentInput,
  Input,
  State,
  Output,
  Row,
  clearCurrentInput,
  setCurrentInput,
  setCursorIndex,
  submit,
} from "../context";
import InputRow from "./InputRow";
import OutputRow from "./OutputRow";

import "../style/Terminal.scss";

const Terminal = (): JSX.Element => {
  const dispatch = useDispatch();
  const { cwd, rows, currentInput } = useSelector((state: State) => state.terminal);

  const handleKeyDown = (input: CurrentInput, event: React.KeyboardEvent<HTMLDivElement>) => {
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

  const renderRow = (row: Row): JSX.Element => {
    if (row.type === "input") {
      const input = row as Input;
      return (
        <InputRow
          cwd={input.wd}
          cursorIndex={input.input.length - 1}
          onKeyDown={handleKeyDown}
          onChange={value => dispatch(setCurrentInput(value))}
          active={false}
          value={input.input}
        />
      );
    } else {
      const output = row as Output;
      return <OutputRow>{output.output}</OutputRow>;
    }
  };

  return (
    <div className="Terminal">
      <div className="Terminal--rows">
        {rows.map(row => (
          <div key={row.timestamp.toString()}>{renderRow(row)}</div>
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
