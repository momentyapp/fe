import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  gap: 10px;
  overflow-x: auto;
  box-sizing: border-box;
`;

export const AddButton = styled(Pressable)`
  display: flex;
  min-width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0;
`;
