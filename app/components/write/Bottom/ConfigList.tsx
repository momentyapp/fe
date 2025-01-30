import { useState, useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdVisibility, MdAutoDelete } from "react-icons/md";

import Typography from "~/components/common/Typography";
import Switch from "~/components/common/Switch";
import Pressable from "~/components/common/Pressable";

import type { MomentConfig } from "common";

const Config = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const ExpireButton = styled(Pressable)`
  padding: 10px;
  border-radius: 10px;
`;

interface ConfigListProps {
  config: MomentConfig;
  setAnonymous: (value: boolean) => void;
  setExpireModalOpen: (value: boolean) => void;
}

export default function ConfigList({
  config,
  setAnonymous,
  setExpireModalOpen,
}: ConfigListProps) {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <Config>
        <Label>
          <MdVisibility size="20" color={theme?.grey1} />
          <Typography color={theme?.grey1} size="16px">
            모멘트를 익명으로 게시
          </Typography>
        </Label>
        <Switch
          value={config.anonymous}
          onChange={(value) => setAnonymous(value)}
        />
      </Config>
      <Config>
        <Label>
          <MdAutoDelete size="20" color={theme?.grey1} />
          <Typography color={theme?.grey1} size="16px">
            자동 삭제
          </Typography>
        </Label>
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
      </Config>
    </div>
  );
}
