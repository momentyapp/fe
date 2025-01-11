import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import { MdMenu } from "react-icons/md";

import Pressable from "~/components/Pressable";
import Logo from "~/assets/svg/logo.svg?react";

const StyledHeader = styled.header`
  display: flex;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.bg1};
`;

const FullWidthDiv = styled.div`
  display: flex;
  flex: 1;
`;

const StyledPressable = styled(Pressable)`
  padding: 5px;
  border-radius: 50%;
`;

export default function AppBar() {
  const theme = useContext(ThemeContext);

  return (
    <StyledHeader>
      {/* left */}
      <FullWidthDiv style={{ justifyContent: "flex-start" }}>
        <StyledPressable backgroundColor={theme?.bg1}>
          <MdMenu size="36" color={theme?.grey1} />
        </StyledPressable>
      </FullWidthDiv>

      {/* center */}
      <FullWidthDiv style={{ justifyContent: "center" }}>
        <Logo width="60" height="100%" />
      </FullWidthDiv>

      {/* right */}
      <FullWidthDiv style={{ justifyContent: "flex-end" }}></FullWidthDiv>
    </StyledHeader>
  );
}
