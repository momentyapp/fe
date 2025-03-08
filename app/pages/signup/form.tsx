import { useContext } from "react";
import { useOutletContext } from "react-router";
import { styled, ThemeContext } from "styled-components";
import { MdAlternateEmail, MdPassword } from "react-icons/md";

import TextInput from "~/components/common/TextInput";

import type { SignupContext } from ".";

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  padding: 7px 0;
`;

export default function Form() {
  const theme = useContext(ThemeContext);
  const {
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    handleSubmit,
  } = useOutletContext<SignupContext>();

  return (
    <Wrapper id="signup_form" onSubmit={handleSubmit}>
      <StyledTextInput
        minLength={2}
        maxLength={20}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        autoComplete="username"
        icon={<MdAlternateEmail size="24" color={theme?.grey2} />}
        placeholder="사용자 이름"
      />
      <StyledTextInput
        minLength={8}
        maxLength={20}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        autoComplete="new-password"
        icon={<MdPassword size="24" color={theme?.grey2} />}
        placeholder="비밀번호"
        type="password"
      />
      <StyledTextInput
        minLength={8}
        maxLength={20}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        name="password-confirm"
        autoComplete="new-password"
        icon={<MdPassword size="24" color={theme?.grey2} />}
        placeholder="비밀번호 확인"
        type="password"
      />
    </Wrapper>
  );
}
