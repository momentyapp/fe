import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.div`
  height: 120px;
  position: relative;
`;

export const ImageWrapper = styled.img`
  height: 100%;
  min-width: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

export const DeleteButton = styled(Pressable)`
  position: absolute;
  right: 6px;
  bottom: 6px;
  background: ${(props) => props.theme.bg1};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
