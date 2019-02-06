import React, { Component } from "react";
import { connect } from "react-redux";
import { State } from "../redux/reducers";
import { InputPair } from "../redux/reducers/terminal";

import InputRow from "./InputRow";

import "../style/Terminal.scss";

interface TerminalProps {
  cwd: string;
  inputPairs: InputPair[];
}

class Terminal extends Component<TerminalProps> {
  render() {
    const { cwd, inputPairs } = this.props;

    return (
      <div className="Terminal">
        <div className="Terminal--rows">
          {inputPairs.map(pair => (
            <div>
              <InputRow
                active={false}
                key={`${pair.timestamp}-input`}
                input={pair.input}
              />
              {pair.output && (
                <div key={`${pair.timestamp}-output`}>{pair.output}</div>
              )}
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
    cwd: state.terminal.cwd,
    inputPairs: state.terminal.inputs
  };
};

export default connect(mapStateToProps)(Terminal);
