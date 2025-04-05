import { useContext, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";
import { MdArrowForward, MdCheck } from "react-icons/md";

import Logo from "~/assets/svg/logo.svg?react";

import Typography from "~/components/common/Typography";
import Pressable from "~/components/common/Pressable";
import Button from "~/components/common/Button";
import Top from "~/components/feed/Top";
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

export interface SignupContext {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Signup() {
  const theme = useContext(ThemeContext);
  const session = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const page = useMemo(
    () =>
      ({
        "/signup": "form",
        "/signup/term": "term",
      }[location.pathname]),
    [location.pathname]
  );

  function handleLogin() {
    navigate("/login");
  }

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    // 페이지가 form일 때
    if (page === "form") {
      if (password !== passwordConfirm) {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
        setErrorModalOpen(true);
        return;
      }
      navigate("/signup/term");
    }
    // 페이지가 term일 때
    else if (page === "term") {
      // 회원가입
      {
        const response = await API.user.signup({
          username,
          password,
        });
        const { code, message } = response.data;

        if (code !== "success") {
          setErrorMessage(message);
          setErrorModalOpen(true);
          return;
        }
      }

      // 로그인
      {
        const response = await API.auth.login({
          username,
          password,
        });
        const { code, result, message } = response.data;

        if (code === "success" && result !== undefined) {
          session.login(result.user, result.accessToken, result.refreshToken);
          navigate("/");
        } else {
          setErrorMessage(message);
          setErrorModalOpen(true);
          return;
        }
      }
    }
  }

  function handleRequestClose() {
    setErrorModalOpen(false);
    navigate("/signup");
  }

  return (
    <>
      <Top />

      <Body>
        <LogoWrapper>
          <Logo width="72" height="40" />
        </LogoWrapper>
        <Outlet
          context={
            {
              username,
              setUsername,
              password,
              setPassword,
              passwordConfirm,
              setPasswordConfirm,
              handleSubmit,
            } satisfies SignupContext
          }
        />
      </Body>

      <Bottom>
        {page === "form" && (
          <AnchorWrapper onClick={handleLogin} backgroundColor={theme?.bg1}>
            <Anchor color={theme?.grey2} size="16px">
              이미 계정이 있어요.
            </Anchor>
          </AnchorWrapper>
        )}

        <StyledButton
          type="submit"
          form="signup_form"
          onClick={page === "term" ? () => handleSubmit() : undefined}
          backgroundColor={theme?.primary3}
          icon={
            <>
              {page === "form" && (
                <MdArrowForward size="24" color={theme?.bg1} />
              )}
              {page === "term" && <MdCheck size="24" color={theme?.bg1} />}
            </>
          }
        >
          <Typography color={theme?.bg1} size="18px">
            {page === "form" && "다음"}
            {page === "term" && "모두 동의하기"}
          </Typography>
        </StyledButton>
      </Bottom>

      <ErrorModal
        message={errorMessage}
        isOpen={errorModalOpen}
        onRequestClose={handleRequestClose}
      />
    </>
  );
}
