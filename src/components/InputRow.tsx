import * as React from "react";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";

import { Caret, TerminalInput, Text } from "./styled";
import { LIGHT_BLUE, LIGHT_GREEN, WHITE } from "./style/colors";

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

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;
`;

const Separator = styled(Text)`
  margin: 0 8px;
`;

export default class InputRow extends React.Component<InputRowProps> {
  cwd: string;
  input = React.createRef<HTMLInputElement>();

  constructor(props: InputRowProps) {
    super(props);
    this.cwd = props.cwd;
  }

  componentDidMount() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  render() {
    const { active, cwd, cursorIndex, value } = this.props;

    return (
      <Row>
        <Text color={LIGHT_GREEN}>stevendcoffey.com:</Text>
        <Text color={LIGHT_BLUE}>{cwd}</Text>
        <Separator color={WHITE}>%</Separator>
        <TerminalInput
          disabled={!active}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          html={value}
          innerRef={this.input}
        />
        <Row>{active && <Caret index={cursorIndex} />}</Row>
      </Row>
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
    if (this.input.current) {
      this.input.current.focus();
    }
  };
}
