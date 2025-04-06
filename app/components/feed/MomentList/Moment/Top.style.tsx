import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  display: flex;
  padding: 0px 15px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
`;

export const Photo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Left = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Username = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
`;

export const Time = styled(Typography)`
  font-size: 14px;
`;

export const Right = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledPressable = styled(Pressable)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
