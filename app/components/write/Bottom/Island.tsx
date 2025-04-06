import { useState } from "react";
import { useTheme } from "styled-components";
import { MdSend } from "react-icons/md";

import Typography from "~/components/common/Typography";
import NeedLoginModal from "~/components/common/NeedLoginModal";

import useSession from "~/contexts/useSession";

import ExpireModal from "./ExpireModal";
import ConfigContainer from "./ConfigContainer";

import * as S from "./Island.style";

import type { MomentConfig } from "common";

interface IslandProps {
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

export default function Island({ config, setConfig, onPost }: IslandProps) {
  const theme = useTheme();
  const session = useSession();

  const [anonymousModalOpen, setAnonymousModalOpen] = useState(false);
  const [expireModalOpen, setExpireModalOpen] = useState(false);

  function setAnonymous(anonymous: boolean) {
    if (session.user === null) {
      setAnonymousModalOpen(true);
      return;
    }
    setConfig((prev) => ({ ...prev, anonymous }));
  }

  function setExpiresIn(expiresIn: number | undefined) {
    setConfig((prev) => ({ ...prev, expiresIn }));
  }

  return (
    <S.Wrapper>
      {/* 설정 */}
      <ConfigContainer
        config={config}
        setAnonymous={setAnonymous}
        setExpireModalOpen={setExpireModalOpen}
      />

      {/* 게시 버튼 */}
      <S.PostButton
        backgroundColor={theme.primary3}
        icon={<MdSend size="20" color={theme.bg1} />}
        onClick={onPost}
      >
        <S.ButtonText color={theme.bg1}>게시하기</S.ButtonText>
      </S.PostButton>

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
    </S.Wrapper>
  );
}
