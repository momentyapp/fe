import { createRef, useContext, useEffect, useState, type Ref } from "react";
import { styled, ThemeContext } from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";

import { MdTune } from "react-icons/md";

import SwitchableTopic from "~/components/SwitchableTopic";
import Pressable from "~/components/Pressable";
import TopicModal from "~/components/TopicModal";
import Slide from "~/components/Slide";

import type { Topic } from "common";

const TopicContainer = styled(TransitionGroup)`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  overflow-x: scroll;
  position: sticky;
  top: 60px;
  background-color: ${(props) => props.theme?.bg1};

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
  const [modalOpen, setModalOpen] = useState(false);
  const [refs, setRefs] = useState<Ref<HTMLButtonElement>[]>([]);

  useEffect(() => {
    setRefs((prevRefs) => {
      return topics.map((_, index) => prevRefs[index] ?? createRef());
    });
  }, [topics]);

  // 주제 활성화를 전환하는 함수
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

  // 모달 열기 함수
  function handleOpenModal() {
    setModalOpen(true);
  }

  // 모달 닫기 함수
  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      <TopicContainer>
        <AddTopic backgroundColor={theme?.bg2} onClick={handleOpenModal}>
          <MdTune size="20" color={theme?.grey1} />
        </AddTopic>

        {topics.map((topic, index) => (
          <Transition key={topic.id} timeout={200} nodeRef={refs[index]}>
            {(state) => (
              <Slide
                direction="right"
                duration={200}
                distance="10px"
                visible={state === "entered" || state === "entering"}
              >
                <SwitchableTopic
                  ref={refs[index]}
                  topic={topic.topic}
                  enabled={topic.enabled}
                  onPress={() => switchTopic(topic.id)}
                  key={topic.id}
                />
              </Slide>
            )}
          </Transition>
        ))}
      </TopicContainer>

      {/* 주제 모달 */}
      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        onRequestClose={handleCloseModal}
        isOpen={modalOpen}
      />
    </>
  );
}
