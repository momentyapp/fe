import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import { MdTune } from "react-icons/md";

import SwitchableTopic from "~/components/SwitchableTopic";
import Pressable from "~/components/Pressable";

import type { Topic } from "common";

const TopicContainer = styled.div`
  display: flex;
  padding: 20px 10px;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  overflow-x: scroll;

  > * {
    flex-shrink: 0;
  }
`;

const AddTopic = styled(Pressable)`
  display: flex;
  height: 36px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

interface TopicFilterProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function TopicFilter({ topics, setTopics }: TopicFilterProps) {
  const theme = useContext(ThemeContext);

  function switchTopic(id: number) {
    setTopics((prevTopics) => {
      return prevTopics.map((topic) => {
        if (topic.id === id) {
          return { ...topic, enabled: !topic.enabled };
        }
        return topic;
      });
    });
  }

  return (
    <TopicContainer>
      <AddTopic backgroundColor={theme?.bg2}>
        <MdTune size="20" color={theme?.grey1} />
      </AddTopic>

      {topics.map((topic) => (
        <SwitchableTopic
          topic={topic.topic}
          enabled={topic.enabled}
          onPress={() => switchTopic(topic.id)}
          key={topic.id}
        />
      ))}
    </TopicContainer>
  );
}
