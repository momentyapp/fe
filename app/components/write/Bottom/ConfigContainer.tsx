import { useTheme } from "styled-components";
import { MdVisibility, MdAutoDelete } from "react-icons/md";

import Switch from "~/components/common/Switch";

import * as S from "./ConfigContainer.style";

import type { MomentConfig } from "common";

interface ConfigContainerProps {
  config: MomentConfig;
  setAnonymous: (value: boolean) => void;
  setExpireModalOpen: (value: boolean) => void;
}

export default function ConfigContainer({
  config,
  setAnonymous,
  setExpireModalOpen,
}: ConfigContainerProps) {
  const theme = useTheme();

  return (
    <div>
      {/* 익명 설정 */}
      <S.ConfigWrapper>
        <S.LabelWrapper>
          <MdVisibility size="20" color={theme.grey1} />
          <S.LabelText color={theme.grey1}>모멘트를 익명으로 게시</S.LabelText>
        </S.LabelWrapper>
        <Switch
          value={config.anonymous}
          onChange={(value) => setAnonymous(value)}
        />
      </S.ConfigWrapper>

      {/* 자동 삭제 설정 */}
      <S.ConfigWrapper>
        <S.LabelWrapper>
          <MdAutoDelete size="20" color={theme.grey1} />
          <S.LabelText color={theme.grey1}>자동 삭제</S.LabelText>
        </S.LabelWrapper>
        <S.ExpireButton
          onClick={() => setExpireModalOpen(true)}
          backgroundColor={theme.bg2}
        >
          <S.ButtonText color={theme.grey1}>
            {config.expiresIn === undefined
              ? "영구 게시"
              : `${config.expiresIn}시간`}
          </S.ButtonText>
        </S.ExpireButton>
      </S.ConfigWrapper>
    </div>
  );
}
