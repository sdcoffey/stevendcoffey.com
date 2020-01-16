import styled from "styled-components";

import ContentEditable from "react-contenteditable";

import {
  BASE_FONT,
  BASE_FONT_SIZE,
  HEAVY_FONT_WEIGHT
} from "../style/typography";

const TerminalInput = styled(ContentEditable)`
  background-color: transparent;
  border: 0;
  caret-color: transparent;
  color: white;
  font-family: ${BASE_FONT};
  font-size: ${BASE_FONT_SIZE};
  font-weight: ${HEAVY_FONT_WEIGHT};
  word-break: break-all;
  word-wrap: break-word;

  &:focus {
    outline: none;
  }
`;

export default TerminalInput;
