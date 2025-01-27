import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import Typography from "~/components/Typography";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface InfoProps {
  icon: React.ReactNode;
  text: string;
}

export default function Info({ icon, text }: InfoProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      {icon}
      <Typography color={theme?.grey2} size="18px">
        {text}
      </Typography>
    </Wrapper>
  );
}
