import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import Pressable from "~/components/Pressable";
import Typography from "~/components/Typography";

const StyledPressable = styled(Pressable)`
  display: flex;
  height: 36px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const StyledTypography = styled(Typography)`
  transition: color 0.2s;
`;

interface SwitchableTopicProps {
  topic: string;
  enabled?: boolean;
  onPress?: () => void;
}

export default function SwitchableTopic({
  topic,
  enabled = false,
  onPress,
}: SwitchableTopicProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledPressable
      backgroundColor={enabled ? theme?.primary3 : theme?.bg2}
      onClick={onPress}
    >
      <StyledTypography color={enabled ? theme?.bg1 : theme?.grey1} size="16px">
        {topic}
      </StyledTypography>
    </StyledPressable>
  );
}
