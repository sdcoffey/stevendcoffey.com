import * as React from "react";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";

import { Caret, TerminalInput } from "./styled";
import { BoldText } from "./style/typography";
import { LIGHT_BLUE, LIGHT_GREEN, WHITE } from "./style/colors";

import "../style/InputRow.scss";

interface InputRowProps {
  active: boolean;
  cwd: string;
  cursorIndex: number;
  value: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onChange: (value: string) => void;
}

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;
`;

const Separator = styled(BoldText)`
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
    const { active, cwd, cursorIndex, onKeyDown, value } = this.props;

    return (
      <Row>
        <BoldText color={LIGHT_GREEN}>stevendcoffey.com:</BoldText>
        <BoldText color={LIGHT_BLUE}>{cwd}</BoldText>
        <Separator color={WHITE}>%</Separator>
        <TerminalInput
          disabled={!active}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={onKeyDown}
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
    const { onKeyDown } = this.props;
    onKeyDown(event);
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (this.input.current) {
      this.input.current.focus();
    }
  };
}
