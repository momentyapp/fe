import React, { type EventHandler } from "react";
import { useTheme } from "styled-components";
import { MdAlternateEmail, MdPassword } from "react-icons/md";

import * as S from "./Body.style";

interface BodyProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: EventHandler<React.FormEvent<HTMLFormElement>>;
}

export default function Body({
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
}: BodyProps) {
  const theme = useTheme();
  return (
    <S.Wrapper>
      <S.Form onSubmit={onSubmit} id="login_form">
        <S.Input
          minLength={2}
          maxLength={20}
          backgroundColor={theme.bg2}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          autoComplete="username"
          icon={<MdAlternateEmail size="24" color={theme.grey2} />}
          placeholder="사용자 이름"
        />
        <S.Input
          minLength={8}
          maxLength={20}
          backgroundColor={theme.bg2}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          autoComplete="current-password"
          icon={<MdPassword size="24" color={theme.grey2} />}
          placeholder="비밀번호"
          type="password"
        />
      </S.Form>
    </S.Wrapper>
  );
}
