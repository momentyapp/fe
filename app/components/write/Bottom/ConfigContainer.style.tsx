import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

export const ConfigWrapper = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
`;

export const LabelWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const LabelText = styled(Typography)`
  font-size: 16px;
`;

export const ExpireButton = styled(Pressable)`
  padding: 10px;
  border-radius: 10px;
`;

export const ButtonText = styled(Typography)`
  font-size: 14px;
`;
