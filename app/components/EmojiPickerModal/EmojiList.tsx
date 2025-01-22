import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import Pressable from "~/components/Pressable";
import Fade from "~/components/Fade";
import Emoji from "~/components/Emoji";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  gap: 3px;
  width: 100%;
`;

const EmojiButton = styled(Pressable)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
`;

const emojis = [..."😀😂😅😋😎😍🤔🙄😣😥😮😯😪🥱😱🥵😡🤮💀💩💪👍👎❤💔"];

interface EmojiListProps {
  onSelect: (emoji: string) => void;
  myEmoji?: string;
}

export default function EmojiList({ onSelect, myEmoji }: EmojiListProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      {emojis.map((emoji, index) => (
        <Fade key={index} visible delay={index * 10} duration={300}>
          <EmojiButton
            onClick={() => onSelect(emoji)}
            backgroundColor={myEmoji === emoji ? theme?.primary5 : theme?.bg2}
          >
            <Emoji size="30px">{emoji}</Emoji>
          </EmojiButton>
        </Fade>
      ))}
    </Wrapper>
  );
}
