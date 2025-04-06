import { styled } from "styled-components";

import TextInput from "~/components/common/TextInput";

export const Wrapper = styled.div`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  gap: 50px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  padding: 50px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
`;
