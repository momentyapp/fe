import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { MdAccountCircle, MdMoreVert } from "react-icons/md";

import Dot from "~/components/common/Dot";
import Typography from "~/components/common/Typography";

import getRelativeTime from "~/utils/getRelativeTime";

import * as S from "./Top.style";

import type { Moment } from "common";

interface TopProps {
  moment: Moment;
  onDetail: () => void;
}

export default function Top({ moment, onDetail }: TopProps) {
  const theme = useTheme();

  const [relativeTime, setRelativeTime] = useState(
    getRelativeTime(new Date(moment.createdAt))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(new Date(moment.createdAt)));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [moment]);

  return (
    <S.Wrapper>
      <S.Left>
        {moment.author?.photo ? (
          <S.Photo
            src={`${import.meta.env.VITE_HOST}/file/moment/${
              moment.author.photo
            }`}
          />
        ) : (
          <MdAccountCircle size="32" color={theme.grey1} />
        )}

        <S.InfoContainer>
          <S.Username color={theme.grey1}>
            {moment.author?.username ?? "익명"}
          </S.Username>
          <Dot size="3px" color={theme.grey1} />
          <S.Time color={theme.grey1}>{relativeTime}</S.Time>
        </S.InfoContainer>
      </S.Left>

      <S.Right>
        <S.StyledPressable onClick={onDetail} backgroundColor={theme.bg1}>
          <MdMoreVert size="24" color={theme.grey1} />
        </S.StyledPressable>
      </S.Right>
    </S.Wrapper>
  );
}
