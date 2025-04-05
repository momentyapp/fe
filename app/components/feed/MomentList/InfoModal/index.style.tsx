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

export const InfoContainer = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
`;

export const ActionContainer = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 5px;
`;

export const Action = styled(Button)`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  justify-content: flex-start;
`;

export const ActionText = styled(Typography)`
  font-size: 18px;
`;
