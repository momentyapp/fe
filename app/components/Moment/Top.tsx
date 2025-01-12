import { useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import { MdAccountCircle, MdMoreVert } from "react-icons/md";

import Dot from "~/components/Dot";
import Typography from "~/components/Typography";
import Pressable from "~/components/Pressable";
import getRelativeTime from "~/utils/getRelativeTime";

import type { Moment } from "common";

interface TopProps {
  moment: Moment;
}

const Wrapper = styled.div`
  display: flex;
  padding: 0px 15px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
`;

const Photo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Left = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Right = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPressable = styled(Pressable)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export default function Top({ moment }: TopProps) {
  const theme = useContext(ThemeContext);

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
    <Wrapper>
      <Left>
        {moment.author?.photo ? (
          <Photo src={moment.author.photo} />
        ) : (
          <MdAccountCircle size="36" color={theme?.grey1} />
        )}
        <Info>
          <Typography color={theme?.grey1} size="18px" weight="700">
            {moment.author?.username ?? "익명"}
          </Typography>
          <Dot size="3px" color={theme?.grey1} />
          <Typography color={theme?.grey1} size="16px">
            {relativeTime}
          </Typography>
        </Info>
      </Left>

      <Right>
        <StyledPressable backgroundColor={theme?.bg2}>
          <MdMoreVert size="24" color={theme?.grey1} />
        </StyledPressable>
      </Right>
    </Wrapper>
  );
}
