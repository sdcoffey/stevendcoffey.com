import React, { Component } from "react";
import { connect } from "react-redux";
import { State } from "../redux/reducers";
import { InputPair } from "../redux/reducers/terminal";

import InputRow from "./InputRow";

import "../style/Terminal.scss";

interface TerminalProps {
  inputPairs: InputPair[];
}

class Terminal extends Component<TerminalProps> {
  render() {
    const { inputPairs } = this.props;

    console.log(inputPairs);
    return (
      <div className="Terminal">
        <div className="Terminal--rows">
          {inputPairs.map(pair => (
            <InputRow />
          ))}
          <InputRow />
        </div>
      </div>
    );
  }
}

const connector = connect((state: State) => ({
  inputPairs: state.terminal.inputs
}));

export default connector(Terminal);
