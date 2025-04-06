import type { HexColor } from "common";
import { motion } from "motion/react";
import { styled } from "styled-components";

import useColorFeedback from "~/hooks/useColorFeedback";

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div<{ $iconPosition: "left" | "right" }>`
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.$iconPosition === "left" ? "10px" : "unset")};
  right: ${(props) => (props.$iconPosition === "right" ? "10px" : "unset")};
`;

const Input = styled.input<{ $iconPosition: "left" | "right" | null }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: none;
  border: none;
  outline: none;
  font-family: "Pretendard Variable";
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.grey2};
  box-sizing: border-box;
  padding: 10px;
  padding-left: ${(props) =>
    props.$iconPosition === "left" ? "40px" : "10px"};
  padding-right: ${(props) =>
    props.$iconPosition === "right" ? "40px" : "10px"};
`;

const MotionInput = motion.create(Input);

interface TextInputProps extends React.ComponentProps<typeof MotionInput> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  backgroundColor?: HexColor;
}

export default function TextInput({
  icon,
  iconPosition = "left",
  backgroundColor = "#00000000",
  type = "text",
  ...props
}: TextInputProps) {
  const { tapColor, focusColor } = useColorFeedback(backgroundColor);

  return (
    <Wrapper>
      {iconPosition === "left" && (
        <IconWrapper $iconPosition="left">{icon}</IconWrapper>
      )}
      <MotionInput
        initial={false}
        {...props}
        type={type}
        animate={{ backgroundColor: backgroundColor ?? "#00000000" }}
        whileHover={{ backgroundColor: focusColor ?? "#00000014" }}
        whileFocus={{ backgroundColor: tapColor ?? "#00000028" }}
        transition={{ duration: 0.1 }}
        $iconPosition={icon === undefined ? null : iconPosition}
      />
      {iconPosition === "right" && (
        <IconWrapper $iconPosition="right">{icon}</IconWrapper>
      )}
    </Wrapper>
  );
}
