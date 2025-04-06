import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

export const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;

export const ButtonText = styled(Typography)`
  font-size: 18px;
`;
