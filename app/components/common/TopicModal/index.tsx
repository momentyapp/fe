import { useContext, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdCheck } from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Slide from "~/components/common/Slide";
import CacheContext from "~/contexts/cache";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

import type { Topic } from "common";
import API from "~/apis";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface TopicModalProps extends Omit<ReactModal.Props, "style"> {
  addedTopics: Topic[];
  setAddedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function TopicModal({
  addedTopics,
  setAddedTopics,
  onRequestClose,
  isOpen,
  ...props
}: TopicModalProps) {
  const theme = useContext(ThemeContext);
  const cache = useContext(CacheContext);

  const lastTimeout = useRef<NodeJS.Timeout>(null);
  const abortController = useRef<AbortController>(new AbortController());

  const [searchValue, setSearchValue] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);

  // 검색어 변경 디바운싱
  async function handleChangeSearchValue(value: string) {
    abortController.current.abort();
    abortController.current = new AbortController();

    const replaced = value.replaceAll(" ", "");
    setSearchValue(replaced);

    if (lastTimeout.current !== null) clearTimeout(lastTimeout.current);
    if (replaced.length === 0 || !/^[가-힣\da-zA-Z]*$/g.test(replaced)) return;

    // 200ms 이후
    lastTimeout.current = setTimeout(async () => {
      // 문자열 검색
      {
        setLoading(true);
        const filteredTopics = await API.topic.searchTopic(
          { query: replaced },
          abortController.current.signal
        );
        setLoading(false);
        const { code, message, result } = filteredTopics.data;

        if (code === "success" && result !== undefined) {
          setTopics(
            result.topics.map((topic) => ({
              id: topic.id,
              name: topic.name,
              trending: topic.trending,
              count: topic.usage,
              enabled: addedTopics.some(
                (addedTopic) => addedTopic.id === topic.id
              ),
            }))
          );
        } else {
          setTopics([]);
        }
      }

      // 의미 검색
      {
        const generatedTopics = await API.topic.generateTopics(
          {
            text: replaced,
          },
          abortController.current.signal
        );
        const { code, message, result } = generatedTopics.data;

        if (code === "success" && result !== undefined) {
          setTopics((prev) => [
            ...prev,
            ...result.topics
              .filter(
                (topic) => !prev.some((prevTopic) => prevTopic.id === topic.id)
              )
              .map((topic) => ({
                id: topic.id,
                name: topic.name,
                trending: topic.trending,
                count: topic.usage,
                enabled: addedTopics.some(
                  (addedTopic) => addedTopic.id === topic.id
                ),
              })),
          ]);
        }
      }
    }, 200);
  }

  // 주제 생성 함수
  function handleCreate(topic: string, topicId: number) {
    const newTopic = {
      name: topic,
      id: topicId,
      enabled: true,
      trending: false,
      usage: 0,
    };

    setAddedTopics((prevTopics) => [newTopic, ...prevTopics]);
    setTopics((prevTopics) => [newTopic, ...prevTopics]);
  }

  return (
    <ReactModal
      closeTimeoutMS={300}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <Content>
        <Slide
          visible={isOpen}
          delay={50}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <SearchInput value={searchValue} onChange={handleChangeSearchValue} />
          <SearchResults
            topics={searchValue.length === 0 ? cache.trendingTopics : topics}
            addedTopics={addedTopics}
            setAddedTopics={setAddedTopics}
            searchValue={searchValue}
            loading={loading}
            onCreate={handleCreate}
          />
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={100}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdCheck size="24" color={theme?.bg1} />}
            onClick={onRequestClose}
          >
            <Typography color={theme?.bg1} size="18px">
              완료
            </Typography>
          </StyledButton>
        </Slide>
      </Content>
    </ReactModal>
  );
}
