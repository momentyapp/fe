import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdClose } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";

import type { Topic } from "common";

interface TopicsProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 10px;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  flex-shrink: 0;
`;

export default function Topics({ topics, setTopics }: TopicsProps) {
  const theme = useContext(ThemeContext);

  function handleClick(topic: Topic) {
    setTopics((prevTopics) => prevTopics.filter((t) => t.id !== topic.id));
  }

  return (
    <Wrapper>
      {topics.map((topic) => (
        <StyledButton
          backgroundColor={theme?.bg3}
          key={topic.id}
          icon={<MdClose size="20" color={theme?.grey1} />}
          iconPosition="right"
          onClick={() => handleClick(topic)}
        >
          <Typography color={theme?.grey1} size="16px">
            {topic.topic}
          </Typography>
        </StyledButton>
      ))}
    </Wrapper>
  );
}
