import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  overflow-x: scroll;
  position: sticky;
  top: 60px;
  background-color: ${(props) => props.theme.bg1};
  z-index: 1;
  scrollbar-width: none;
`;

export const AddTopic = styled(Pressable)`
  display: flex;
  height: 36px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-right: 15px;
`;
