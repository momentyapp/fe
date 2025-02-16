import { styled } from "styled-components";

const AnimatedCircle = styled.circle<{ $size: number }>`
  animation: rotate 1s linear infinite;
  transform-origin: 50% 50%;
  stroke-dashoffset: ${(props) => (props.$size * Math.PI) / 4};

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface CircularProgressProps {
  color?: string;
  size: number;
}

export default function CircularProgress({
  color,
  size,
}: CircularProgressProps) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <AnimatedCircle
        $size={size}
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - size / 10}
        fill="none"
        stroke={color}
        stroke-width={size / 10}
        strokeDasharray={`${(size * Math.PI) / 2} ${size * Math.PI}`}
      />
    </svg>
  );
}
