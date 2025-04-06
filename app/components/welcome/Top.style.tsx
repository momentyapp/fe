import { styled } from "styled-components";
import Typography from "../common/Typography";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  min-height: 200px;
  height: calc(100vh - 500px);
`;

export const Text = styled(Typography)`
  font-size: 18px;
`;
