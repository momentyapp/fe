import { styled } from "styled-components";

export const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: ${(props) => props.theme.bg1};
  border-bottom: 1px solid ${(props) => props.theme.bg2};
`;
