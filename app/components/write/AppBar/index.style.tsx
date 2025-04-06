import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export const PostButton = styled(Button)`
  padding: 10px 15px;
  border-radius: 10px;
`;

export const ButtonText = styled(Typography)`
  font-size: 16px;
`;
