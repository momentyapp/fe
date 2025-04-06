import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  padding: 5px 15px;
  box-sizing: border-box;
`;

export const AddReaction = styled(Pressable)<{ $myEmoji?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 0 ${(props) => (props.$myEmoji ? "1px" : "0px")}
    ${(props) => props.theme.primary4} inset;
  border-radius: 10px;
  margin-right: 15px;
`;
