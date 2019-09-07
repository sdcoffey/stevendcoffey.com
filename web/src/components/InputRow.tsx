import * as React from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import "../style/InputRow.scss";

interface InputRowProps {
  active: boolean;
  cwd: string;
  inputValue: string;
  onSubmit: () => void;
  onChange: (newValue: string) => void;
  onClearCurrentInput: () => void;
}

export default class InputRow extends React.Component<InputRowProps> {
  cwd: string;
  input: HTMLDivElement | null;

  constructor(props: InputRowProps) {
    super(props);
    this.cwd = props.cwd;
    this.input = null;
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { active, cwd, inputValue } = this.props;

    return (
      <div className="input-row">
        <span className="input-row__host">stevendcoffey.com:</span>
        <span className="input-row__prompt">{cwd}</span>
        <span className="input-row__separator">%</span>
        <ContentEditable
          className="input-row__input"
          disabled={!active}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          html={inputValue}
          innerRef={(ref: HTMLInputElement) => {
            this.input = ref;
          }}
        />
        {active && <div className="input-row__caret" />}
      </div>
    );
  }

  handleChange = (event: any): void => {
    const { onChange } = this.props;
    if (event.target.value) {
      const sanitized = sanitizeHtml(event.target.value, { allowedTags: [] });
      onChange(sanitized);
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (event.key.toLowerCase()) {
      case "enter":
        event.preventDefault();

        const { onSubmit } = this.props;
        onSubmit();

        break;
      case "u":
        if (event.ctrlKey) {
          const { onClearCurrentInput } = this.props;
          onClearCurrentInput();
        }
        break;
      default:
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (this.input) {
      this.input.focus();
    }
  };
}
