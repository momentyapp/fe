import { styled } from "styled-components";

const StyledDiv = styled.div<{ $color?: string; $size: string }>`
  min-width: ${(props) => props.$size};
  min-height: ${(props) => props.$size};
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`;

interface DotProps {
  color?: string;
  size: string;
}

export default function Dot({ color, size }: DotProps) {
  return <StyledDiv $color={color} $size={size} />;
}
