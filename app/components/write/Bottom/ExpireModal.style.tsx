import { styled } from "styled-components";

import Button from "~/components/common/Button";
import TextInput from "~/components/common/TextInput";
import Typography from "~/components/common/Typography";

export const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TimeWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TimeInput = styled(TextInput)`
  font-size: 24px;
  text-align: center;
  width: 72px;
`;

export const TimeSuffix = styled(Typography)`
  font-size: 24px;
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

export const ButtonText = styled(Typography)`
  font-size: 18px;
`;
