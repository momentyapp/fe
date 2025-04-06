import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
`;

export const Body = styled(Typography)`
  padding: 0px 15px 0px 30px;
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 16px;
  font-weight: 400;
`;

export const PhotoContainer = styled.div`
  display: flex;
  height: 160px;
  padding: 10px 30px;
  box-sizing: border-box;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
`;

export const PhotoWrapper = styled(Pressable)`
  height: 100%;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
`;

export const StyledImg = styled.img`
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export const TopicContainer = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  overflow-x: auto;
  padding: 5px 30px;
  width: 100%;
  border-radius: 10px;
  scrollbar-width: none;
`;

export const Topic = styled(Button)<{ $enabled: boolean }>`
  flex-shrink: 0;
  display: flex;
  padding: 10px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

export const TopicText = styled(Typography)`
  font-size: 14px;
`;
