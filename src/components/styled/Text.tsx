import styled from "styled-components";

import {
  BASE_FONT,
  BASE_FONT_SIZE,
  BASE_FONT_WEIGHT
} from "../style/typography";

interface TextProps {
  color: string;
}

const Text = styled.span<TextProps>`
  color: ${props => props.color};
  font-family: ${BASE_FONT};
  font-size: ${BASE_FONT_SIZE};
  font-weight: ${BASE_FONT_WEIGHT};
`;

export default Text;
