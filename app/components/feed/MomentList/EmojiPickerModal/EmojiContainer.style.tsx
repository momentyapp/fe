import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";
import Emoji from "~/components/common/Emoji";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  gap: 3px;
  width: 100%;
`;

export const EmojiButton = styled(Pressable)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-radius: 10px;
`;

export const EmojiText = styled(Emoji)`
  font-size: 30px;
`;
