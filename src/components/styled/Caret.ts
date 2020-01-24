import styled from "styled-components";

interface CaretProps {
  offset: number;
}

const monospaceWidth = 10.93;

const Caret = styled.div<CaretProps>`
  left: ${props => monospaceWidth * props.offset}px;
  align-self: stretch;
  background-color: rgba(255, 255, 255, 0.8);
  width: 10px;
  position: relative;
`;

export default Caret;
