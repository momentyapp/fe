import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.header`
  display: flex;
  padding: 0px 20px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bg1};
  z-index: 1;
`;

export const Section = styled.div`
  display: flex;
  flex: 1;
`;

export const Left = styled(Section)`
  justify-content: flex-start;
`;

export const Center = styled(Section)`
  justify-content: center;
`;

export const Right = styled(Section)`
  justify-content: flex-end;
`;

export const StyledPressable = styled(Pressable)`
  padding: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;
