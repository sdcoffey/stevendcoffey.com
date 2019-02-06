import * as React from "react";
import { connect } from "react-redux";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import { State } from "../redux/reducers";
import { Dispatch } from "../redux/store";
import { processCommand } from "../redux/actions/terminalActions";

import "../style/InputRow.scss";

interface InputRowProps {
  active: boolean;
  input: string;
  cwd: string;
  processCommand?: typeof processCommand;
}

interface InputRowState {
  currentText: string;
}

class InputRow extends React.Component<InputRowProps, InputRowState> {
  cwd: string;
  input: HTMLDivElement | null;

  constructor(props: InputRowProps) {
    super(props);
    this.cwd = props.cwd;
    this.input = null;
    this.state = {
      currentText: props.input
    };
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { active, cwd } = this.props;
    const { currentText } = this.state;

    return (
      <div className="InputRow">
        <span className="InputRow--host">stevendcoffey.com:</span>
        <span className="InputRow--prompt">{cwd}</span>
        <span className="InputRow--separator">%</span>
        <ContentEditable
          className="InputRow--input"
          disabled={!active}
          onBlur={this.handleBlur}
          html={currentText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          innerRef={(ref: HTMLDivElement) => {
            this.input = ref;
          }}
        />
        {active && <div className="InputRow--caret" />}
      </div>
    );
  }

  handleChange = (event: any): void => {
    if (event.target.value) {
      this.setState({ currentText: sanitizeHtml(event.target.value) });
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (event.key.toLowerCase()) {
      case "enter":
        const { processCommand } = this.props;
        const { currentText } = this.state;
        if (processCommand) {
          processCommand(currentText);
          event.preventDefault();
          this.setState({ currentText: "" });
        }
      case "u":
        if (event.ctrlKey) {
          this.setState({ currentText: "" });
        }
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (this.input) {
      this.input.focus();
    }
  };
}

const mapStateToProps = (state: State) => ({
  cwd: state.terminal.cwd
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  processCommand: (input: string) => dispatch(processCommand(input))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputRow);
