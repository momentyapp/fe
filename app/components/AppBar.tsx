import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import { MdAccountCircle, MdMenu } from "react-icons/md";

import Pressable from "~/components/Pressable";
import SessionContext from "~/contexts/session";
import Logo from "~/assets/svg/logo.svg?react";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router";

const StyledHeader = styled.header`
  display: flex;
  padding: 0px 20px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme?.bg1};
`;

const FullWidthDiv = styled.div`
  display: flex;
  flex: 1;
`;

const StyledPressable = styled(Pressable)`
  padding: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export default function AppBar() {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const user = session?.session?.user;
  const photo = user?.photo;

  function handleLogout() {
    session.setSession(undefined);
    navigate(0);
  }

  function handleDelete() {
    // TODO: 회원 탈퇴 요청
    session.setSession(undefined);
    navigate(0);
  }

  return (
    <StyledHeader>
      {/* left */}
      <FullWidthDiv style={{ justifyContent: "flex-start" }}>
        <StyledPressable backgroundColor={theme?.bg1}>
          <MdMenu size="32" color={theme?.grey1} />
        </StyledPressable>
      </FullWidthDiv>

      {/* center */}
      <FullWidthDiv style={{ justifyContent: "center" }}>
        <Logo width="40" height="100%" />
      </FullWidthDiv>

      {/* right */}
      <FullWidthDiv style={{ justifyContent: "flex-end" }}>
        <StyledPressable
          backgroundColor={theme?.bg1}
          onClick={() => setModalOpen(true)}
        >
          {photo ? (
            <Photo src={photo} />
          ) : (
            <MdAccountCircle size="36" color={theme?.grey1} />
          )}
        </StyledPressable>
      </FullWidthDiv>

      {/* 프로필 모달 */}
      {user && (
        <ProfileModal
          user={user}
          onLogout={handleLogout}
          onDelete={handleDelete}
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        />
      )}
    </StyledHeader>
  );
}
