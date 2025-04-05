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

export const MessasgeWrapper = styled.div`
  padding-bottom: 20px;
`;

export const Message = styled(Typography)`
  font-size: 18px;
`;

export const ActionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;

export const Action = styled(Button)`
  width: 100%;
`;

export const ActionText = styled(Typography)`
  font-size: 18px;
`;
