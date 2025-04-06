import { styled, useTheme } from "styled-components";

import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Text = styled(Typography)`
  font-size: 18px;
`;

interface DetailProps {
  icon: React.ReactNode;
  text: string;
}

export default function Detail({ icon, text }: DetailProps) {
  const theme = useTheme();

  return (
    <Wrapper>
      {icon}
      <Text color={theme.grey2}>{text}</Text>
    </Wrapper>
  );
}
