import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

export const Wrapper = styled.div`
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

export const Name = styled(Typography)`
  white-space: nowrap;
  font-size: 18px;
`;

export const ButtonText = styled(Typography)`
  white-space: nowrap;
  font-size: 16px;
`;

export const CreateButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  gap: 5px;
  border-radius: 10px;
`;
