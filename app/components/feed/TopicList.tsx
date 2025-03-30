import { useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { AnimatePresence } from "motion/react";
import { MdTune } from "react-icons/md";

import Pressable from "~/components/common/Pressable";
import TopicModal from "~/components/common/TopicModal";

import Topic from "./Topic";

import type { Topic as TopicType } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  overflow-x: scroll;
  position: sticky;
  top: 60px;
  background-color: ${(props) => props.theme?.bg1};
  z-index: 1;
`;

const AddTopic = styled(Pressable)`
  display: flex;
  height: 36px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-right: 15px;
`;

interface TopicListProps {
  topics: TopicType[];
  setTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
}

export default function TopicList({ topics, setTopics }: TopicListProps) {
  const theme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);

  // 주제 제거
  function removeTopic(topicId: number) {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== topicId)
    );
  }

  const [initialized, setInitialized] = useState(false);
  useEffect(() => setInitialized(true), []);

  return (
    <Wrapper>
      <AddTopic backgroundColor={theme?.bg2} onClick={() => setModalOpen(true)}>
        <MdTune size="20" color={theme?.grey1} />
      </AddTopic>

      <AnimatePresence initial={initialized}>
        {topics.map((topic) => (
          <Topic
            topic={topic.name}
            key={topic.id}
            onClick={() => removeTopic(topic.id)}
          />
        ))}
      </AnimatePresence>

      {/* 주제 모달 */}
      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        onRequestClose={() => setModalOpen(false)}
        isOpen={modalOpen}
      />
    </Wrapper>
  );
}
