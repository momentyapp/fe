import { styled } from "styled-components";

const StyledP = styled.p<{
  $size?: string;
}>`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.$size};
  font-family: "Tossface";
`;

interface EmojiProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: string;
}

export default function Emoji({ children, size, ...props }: EmojiProps) {
  return (
    <StyledP {...props} $size={size}>
      {children}
    </StyledP>
  );
}
