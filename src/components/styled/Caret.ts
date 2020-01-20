import styled from "styled-components";

interface CaretProps {
  index: number;
}

const Caret = styled.div<CaretProps>`
  left: ${props => 10 * props.index}px;
  align-self: stretch;
  background-color: rgba(255, 255, 255, 0.8);
  width: 10px;
`;

export default Caret;
