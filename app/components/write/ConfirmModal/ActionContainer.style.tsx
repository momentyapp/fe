import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;

export const Action = styled(Button)`
  width: 100%;
`;

export const ButtonText = styled(Typography)`
  font-size: 18px;
`;
