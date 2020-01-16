import * as React from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import "../style/InputRow.scss";

interface InputRowProps {
  active: boolean;
  cwd: string;
  cursorIndex: number;
  value: string;
  onSubmit: () => void;
  onChange: (newValue: string) => void;
  onClearCurrentInput: () => void;
  onCursorIndexChange: (newIndex: number) => void;
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
    const { active, cwd, cursorIndex, value } = this.props;

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
          html={value}
          innerRef={(ref: HTMLInputElement) => {
            this.input = ref;
          }}
        />
        {active && (
          <div
            style={this.cursorStyle(cursorIndex)}
            className="input-row__caret"
          />
        )}
      </div>
    );
  }

  cursorStyle = (cursorIndex: number) => ({
    left: 10 * cursorIndex
  });

  handleChange = (event: any): void => {
    const { onChange } = this.props;
    if (event.target.value) {
      const sanitized = sanitizeHtml(event.target.value, { allowedTags: [] });
      onChange(sanitized);
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const {
      cursorIndex,
      onClearCurrentInput,
      onCursorIndexChange,
      onSubmit
    } = this.props;

    switch (event.key.toLowerCase()) {
      case "enter":
        event.preventDefault();
        onSubmit();

        break;
      case "u":
        if (event.ctrlKey) {
          onClearCurrentInput();
        }
        break;
      case "arrowleft":
        onCursorIndexChange(cursorIndex - 1);
        break;
      case "arrowright":
        onCursorIndexChange(cursorIndex + 1);
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
