import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import Typography from "~/components/Typography";
import Pressable from "~/components/Pressable";
import Emoji from "~/components/Emoji";

import type { Moment } from "common";

interface BottomProps {
  moment: Moment;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const ReactionContainer = styled.div`
  display: flex;
  padding: 0px 20px;
  gap: 10px;
`;

const StyledPressable = styled(Pressable)`
  display: flex;
  height: 38px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
`;

export default function Bottom({ moment }: BottomProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <ReactionContainer>
        {Object.keys(moment.reactions).map((reaction) => (
          <StyledPressable key={reaction} backgroundColor={theme?.bg1}>
            <Emoji size="18px">{reaction}</Emoji>
            <Typography color={theme?.grey1} size="16px">
              {moment.reactions[reaction].toLocaleString()}
            </Typography>
          </StyledPressable>
        ))}
      </ReactionContainer>
    </Wrapper>
  );
}
