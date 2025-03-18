import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";
import { MdAlternateEmail, MdLogin, MdPassword } from "react-icons/md";

import Logo from "~/assets/svg/logo.svg?react";

import Typography from "~/components/common/Typography";
import Pressable from "~/components/common/Pressable";
import Button from "~/components/common/Button";
import Top from "~/components/common/Top";
import TextInput from "~/components/common/TextInput";
import ErrorModal from "~/components/common/ErrorModal";

import useSession from "~/contexts/useSession";

import API from "~/apis";

const Body = styled.div`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  gap: 50px;
`;

const LogoWrapper = styled.div`
  display: flex;
  padding: 50px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
`;

const InputList = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  padding: 7px 0;
`;

const Bottom = styled.div`
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

const StyledButton = styled(Button)`
  width: 100%;
`;

const AnchorWrapper = styled(Pressable)`
  padding: 5px 10px;
  border-radius: 5px;
`;

const Anchor = styled(Typography)`
  text-decoration-line: underline;
`;

export default function Login() {
  const theme = useContext(ThemeContext);
  const session = useSession();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  function handleSignUp() {
    navigate("/signup");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await API.auth.login({ username, password });
    const { code, result, message } = response.data;

    if (code === "success" && result !== undefined) {
      session.login(result.user, result.accessToken, result.refreshToken);
      navigate("/");
    } else {
      setErrorMessage(message);
      setErrorModalOpen(true);
    }
  }

  return (
    <>
      <Top />

      <Body>
        <LogoWrapper>
          <Logo width="72" height="40" />
        </LogoWrapper>

        <InputList onSubmit={handleSubmit} id="login_form">
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
            autoComplete="current-password"
            icon={<MdPassword size="24" color={theme?.grey2} />}
            placeholder="비밀번호"
            type="password"
          />
        </InputList>
      </Body>

      <Bottom>
        <AnchorWrapper onClick={handleSignUp} backgroundColor={theme?.bg1}>
          <Anchor color={theme?.grey2} size="16px">
            계정 새로 만들기
          </Anchor>
        </AnchorWrapper>

        <StyledButton
          type="submit"
          form="login_form"
          backgroundColor={theme?.primary3}
          icon={<MdLogin size="24" color={theme?.bg1} />}
        >
          <Typography color={theme?.bg1} size="18px">
            로그인
          </Typography>
        </StyledButton>
      </Bottom>

      <ErrorModal
        message={errorMessage}
        isOpen={errorModalOpen}
        onRequestClose={() => setErrorModalOpen(false)}
      />
    </>
  );
}
