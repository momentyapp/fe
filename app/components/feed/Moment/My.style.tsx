import { styled } from "styled-components";

import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 5px 20px;
  align-items: center;
  box-sizing: border-box;
`;

export const Text = styled(Typography)`
  font-size: 14px;
`;
