import { styled } from "styled-components";

const Wrapper = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Tossface";
`;

interface EmojiProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export default function Emoji({ children, ...props }: EmojiProps) {
  return <Wrapper {...props}>{children}</Wrapper>;
}
