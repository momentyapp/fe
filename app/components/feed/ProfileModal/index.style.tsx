import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Name = styled(Typography)`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailContainer = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 10px;
`;

export const Actions = styled.div`
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

export const StyledPressable = styled(Pressable)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`;
