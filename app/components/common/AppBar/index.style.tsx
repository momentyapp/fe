import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.header`
  display: flex;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bg1};
`;

export const BackButton = styled(Pressable)`
  padding: 5px;
  border-radius: 50%;
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
