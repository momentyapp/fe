import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  padding: 20px;
  gap: 10px;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg3};
`;

export const PostButton = styled(Button)`
  padding: 15px;
  border-radius: 15px;
`;

export const ButtonText = styled(Typography)`
  font-size: 18px;
`;
