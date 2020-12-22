import * as React from "react";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";

import { BoldText } from "./style/typography";
import { Caret, TerminalInput } from "./styled";
import { CurrentInput } from "../context";
import { LIGHT_BLUE, LIGHT_GREEN, WHITE } from "./style/colors";

interface InputRowProps {
  active: boolean;
  cwd: string;
  cursorIndex: number;
  onKeyDown: (currentInput: CurrentInput, event: React.KeyboardEvent<HTMLDivElement>) => void;
  onChange: (value: string) => void;
  value: string;
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
    const { active, value, cursorIndex, cwd } = this.props;

    return (
      <Row>
        <BoldText color={LIGHT_GREEN}>stevendcoffey.com:</BoldText>
        <BoldText color={LIGHT_BLUE}>{cwd}</BoldText>
        <Separator color={WHITE}>%</Separator>
        <TerminalInput
          disabled={!active}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          html={value}
          innerRef={this.input}
        />
        <Row>{active && <Caret offset={cursorIndex - value.length} />}</Row>
      </Row>
    );
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { cursorIndex, value, onKeyDown } = this.props;

    onKeyDown({ cursorIndex, value }, event);
  };

  handleChange = (event: any): void => {
    const { onChange } = this.props;
    if (event.target.value) {
      const sanitized = sanitizeHtml(event.target.value, { allowedTags: [] });
      onChange(sanitized);
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (this.input.current) {
      this.input.current.focus();
    }
  };
}
