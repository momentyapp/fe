import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdClose } from "react-icons/md";

import Button from "~/components/Button";

import type { MomentConfig } from "common";

interface ConfigProps {
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  gap: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.bg3};
`;

export default function Config({ config, setConfig, onPost }: ConfigProps) {
  const theme = useContext(ThemeContext);

  return <Wrapper></Wrapper>;
}
