import { useState, useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdVisibility, MdAutoDelete, MdSend } from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import NeedLoginModal from "~/components/common/NeedLoginModal";
import Switch from "~/components/common/Switch";
import Pressable from "~/components/common/Pressable";
import SessionContext from "~/contexts/session";

import ExpireModal from "./ExpireModal";

import type { MomentConfig } from "common";

interface ConfigProps {
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

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

const ConfigContainer = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
`;

const ConfigLabel = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  padding: 15px;
  border-radius: 15px;
`;

const ExpireButton = styled(Pressable)`
  padding: 10px;
  border-radius: 10px;
`;

export default function Config({ config, setConfig, onPost }: ConfigProps) {
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
      <div>
        <ConfigContainer>
          <ConfigLabel>
            <MdVisibility size="20" color={theme?.grey1} />
            <Typography color={theme?.grey1} size="16px">
              모멘트를 익명으로 게시
            </Typography>
          </ConfigLabel>
          <Switch
            value={config.anonymous}
            onChange={(value) => setAnonymous(value)}
          />
        </ConfigContainer>
        <ConfigContainer>
          <ConfigLabel>
            <MdAutoDelete size="20" color={theme?.grey1} />
            <Typography color={theme?.grey1} size="16px">
              자동 삭제
            </Typography>
          </ConfigLabel>
          <ExpireButton
            onClick={() => setExpireModalOpen(true)}
            backgroundColor={theme?.bg2}
          >
            <Typography color={theme?.grey1} size="14px">
              {config.expiresIn === undefined
                ? "영구 게시"
                : `${config.expiresIn}시간`}
            </Typography>
          </ExpireButton>
        </ConfigContainer>
      </div>
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
        message="로그인되어 있지 않으면 모멘트를 익명으로만 게시할 수 있습니다."
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
