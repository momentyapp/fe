import { styled } from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 40px;
  background: ${(props) => `linear-gradient(
    0deg,
    ${props.theme.bg1} 0%,
    ${props.theme.bg1} 90%,
    transparent 100%
  )`};
`;
