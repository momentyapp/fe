import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface InfoProps {
  icon: React.ReactNode;
  children: string;
}

export default function Info({ icon, children }: InfoProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      {icon}
      <Typography color={theme?.grey1} size="18px">
        {children}
      </Typography>
    </Wrapper>
  );
}
