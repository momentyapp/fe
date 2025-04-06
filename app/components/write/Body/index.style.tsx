import { styled } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 300px 0;
  width: 100%;
`;

export const Input = styled(TextareaAutosize)`
  border: none;
  font-family: "Pretendard Variable", "Tossface";
  font-weight: 500;
  color: ${(props) => props.theme.grey1};
  background: transparent;
  font-size: 22px;
  outline: none;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => props.theme.grey3};
  }
`;
