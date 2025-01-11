import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdSearch } from "react-icons/md";

import TextInput from "~/components/TextInput";

const StyledMdSearch = styled(MdSearch)`
  transition: color 0.2s;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
`;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledTextInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      icon={(focus) => (
        <StyledMdSearch size="24" color={focus ? theme?.grey1 : theme?.grey2} />
      )}
    />
  );
}
