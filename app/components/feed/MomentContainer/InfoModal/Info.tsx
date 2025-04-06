import { styled, useTheme } from "styled-components";

import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const InfoText = styled(Typography)`
  font-size: 18px;
`;

interface InfoProps {
  icon: React.ReactNode;
  text: string;
}

export default function Info({ icon, text }: InfoProps) {
  const theme = useTheme();

  return (
    <Wrapper>
      {icon}
      <InfoText color={theme.grey2}>{text}</InfoText>
    </Wrapper>
  );
}
