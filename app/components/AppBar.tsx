import { styled } from "styled-components";

import Logo from "~/assets/svg/logo.svg?react";

const StyledHeader = styled.header`
  display: flex;
  padding: 30px 20px;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.bg1};
`;

export default function AppBar() {
  return (
    <StyledHeader>
      <div></div>
      <div>
        <Logo width="60" height="100%" />
      </div>
      <div></div>
    </StyledHeader>
  );
}
