import { styled } from "styled-components";

import Typography from "~/components/common/Typography";
import Button from "~/components/common/Button";
import Pressable from "~/components/common/Pressable";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${(props) => props.theme.bg1};
`;

export const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
  height: 58px;
  border-radius: 20px;
`;

export const AnchorWrapper = styled(Pressable)`
  padding: 5px 10px;
  border-radius: 5px;
`;

export const Anchor = styled(Typography)`
  font-size: 16px;
  text-decoration-line: underline;
`;

export const ButtonText = styled(Typography)`
  font-size: 18px;
`;
