import styled from "styled-components";

export const BASE_FONT = "monospace";
export const BASE_FONT_SIZE = "1.4em";
export const HEAVY_FONT_WEIGHT = 700;
export const REGULAR_FONT_WEIGHT = 500;

const BaseText = styled.span`
  color: ${props => props.color};
  font-family: ${BASE_FONT};
  font-size: ${BASE_FONT_SIZE};
`;

export const BoldText = styled(BaseText)`
  font-weight: ${HEAVY_FONT_WEIGHT};
`;

export const Text = styled(BaseText)`
  font-weight: ${REGULAR_FONT_WEIGHT};
`;
