import { styled } from "styled-components";

const StyledP = styled.p<{
  $color?: string;
  $size?: string;
  $weight?: string | number;
}>`
  margin: 0;
  padding: 0;
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$size};
  font-weight: ${(props) => props.$weight};
  font-family: "Pretendard Variable", "Tossface";
`;

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: string;
  size?: string;
  weight?: string | number;
}

export default function Typography({
  children,
  color,
  size,
  weight = 500,
  ...props
}: TypographyProps) {
  return (
    <StyledP {...props} $color={color} $size={size} $weight={weight}>
      {children}
    </StyledP>
  );
}
