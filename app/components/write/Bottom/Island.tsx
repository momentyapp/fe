import { useState, useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdSend } from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import NeedLoginModal from "~/components/common/NeedLoginModal";
import Pressable from "~/components/common/Pressable";
import SessionContext from "~/contexts/session";

import ExpireModal from "./ExpireModal";
import ConfigList from "./ConfigList";

import type { MomentConfig } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  padding: 20px;
  gap: 10px;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg3};
`;
const StyledButton = styled(Button)`
  padding: 15px;
  border-radius: 15px;
`;

const ExpireButton = styled(Pressable)`
  padding: 10px;
  border-radius: 10px;
`;

interface IslandProps {
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

export default function Island({ config, setConfig, onPost }: IslandProps) {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);

  const [anonymousModalOpen, setAnonymousModalOpen] = useState(false);
  const [expireModalOpen, setExpireModalOpen] = useState(false);

  function setAnonymous(anonymous: boolean) {
    if (session.session === undefined) {
      setAnonymousModalOpen(true);
      return;
    }
    setConfig((prev) => ({ ...prev, anonymous }));
  }

  function setExpiresIn(expiresIn: number | undefined) {
    setConfig((prev) => ({ ...prev, expiresIn }));
  }

  return (
    <Wrapper>
      {/* 설정 */}
      <ConfigList
        config={config}
        setAnonymous={setAnonymous}
        setExpireModalOpen={setExpireModalOpen}
      />

      {/* 게시 버튼 */}
      <StyledButton
        backgroundColor={theme?.primary3}
        icon={<MdSend size="20" color={theme?.bg1} />}
        onClick={onPost}
      >
        <Typography color={theme?.bg1} size="18px">
          게시하기
        </Typography>
      </StyledButton>

      {/* 익명 게시글 경고 모달 */}
      <NeedLoginModal
        isOpen={anonymousModalOpen}
        onRequestClose={() => setAnonymousModalOpen(false)}
        message="로그인되어 있지 않으면 모멘트를 익명으로만 게시할 수 있어요."
      />

      {/* 자동 삭제 설정 모달 */}
      <ExpireModal
        value={config.expiresIn ?? 0}
        isOpen={expireModalOpen}
        onRequestClose={() => setExpireModalOpen(false)}
        onSubmit={setExpiresIn}
      />
    </Wrapper>
  );
}
