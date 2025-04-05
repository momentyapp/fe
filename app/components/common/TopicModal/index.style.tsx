import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import TextInput from "~/components/common/TextInput";

export const ContentContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SearchInput = styled(TextInput)`
  width: 100%;
  height: 45px;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;

export const ButtonText = styled(Typography)`
  font-size: 16px;
`;
