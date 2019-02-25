import React, { Component } from "react";
import { connect } from "react-redux";

import { State } from "../redux/reducers";
import { InputPair } from "../redux/reducers/terminal";
import InputRow from "./InputRow";
import OutputRow from "./OutputRow";

import "../style/Terminal.scss";

interface TerminalProps {
  inputPairs: InputPair[];
}

class Terminal extends Component<TerminalProps> {
  render() {
    const { inputPairs } = this.props;

    return (
      <div className="Terminal">
        <div className="Terminal--rows">
          {inputPairs.map(pair => (
            <div key={pair.timestamp.toString()}>
              <InputRow active={false} input={pair.input} />
              {pair.output && <OutputRow>{pair.output}</OutputRow>}
            </div>
          ))}
          <InputRow input={""} active={true} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    inputPairs: state.terminal.inputs
  };
};

export default connect(mapStateToProps)(Terminal);
