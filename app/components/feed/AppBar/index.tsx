import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";

import { MdAccountCircle, MdMenu } from "react-icons/md";

import useSession from "~/contexts/useSession";

import NeedLoginModal from "~/components/common/NeedLoginModal";
import ProfileModal from "~/components/feed/ProfileModal";

import Logo from "~/assets/svg/logo.svg?react";

import * as S from "./index.style";

export default function AppBar() {
  const theme = useTheme();
  const session = useSession();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const user = session?.user;
  const photo = user?.photo;

  function handleLogout() {
    session.logout();
    navigate("/welcome");
    setModalOpen(false);
  }

  function handleDelete() {
    // TODO: 회원탈퇴 API 호출
  }

  return (
    <S.Wrapper>
      {/* left */}
      <S.Left>
        <S.StyledPressable backgroundColor={theme?.bg1}>
          <MdMenu size="32" color={theme?.grey1} />
        </S.StyledPressable>
      </S.Left>

      {/* center */}
      <S.Center>
        <Logo width="40" height="100%" />
      </S.Center>

      {/* right */}
      <S.Right>
        <S.StyledPressable
          backgroundColor={theme?.bg1}
          onClick={() => setModalOpen(true)}
        >
          {photo ? (
            <S.Photo
              src={`${import.meta.env.VITE_HOST}/file/profile/${photo}`}
            />
          ) : (
            <MdAccountCircle size="36" color={theme?.grey1} />
          )}
        </S.StyledPressable>
      </S.Right>

      {/* 모달 */}
      {user ? (
        <ProfileModal
          user={user}
          onLogout={handleLogout}
          onDelete={handleDelete}
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        />
      ) : (
        <NeedLoginModal
          message="프로필을 확인하려면 로그인하세요."
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        />
      )}
    </S.Wrapper>
  );
}
