import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdCheck } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

import type { Topic } from "common";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Part = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const sampleTopics: Topic[] = [
  { topic: "매일우유", id: 0, count: 232532, trending: true },
  { topic: "국회의사당역", id: 1, count: 65342 },
  { topic: "탄핵", id: 2, count: 30012 },
  { topic: "양자컴퓨터", id: 6, count: 9232 },
  { topic: "엔비디아", id: 7, count: 8923 },
  { topic: "삼성", id: 8, count: 2342 },
];

interface TopicModalProps extends Omit<ReactModal.Props, "style"> {
  addedTopics: Topic[];
  setAddedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function TopicModal({
  addedTopics,
  setAddedTopics,
  onRequestClose,
  ...props
}: TopicModalProps) {
  const theme = useContext(ThemeContext);

  const [searchValue, setSearchValue] = useState("");
  const [topics, setTopics] = useState<Topic[]>(
    sampleTopics.map((topic) => ({
      ...topic,
      enabled: addedTopics.some((addedTopic) => addedTopic.id === topic.id),
    }))
  );

  return (
    <ReactModal closeTimeoutMS={300} onRequestClose={onRequestClose} {...props}>
      <Content>
        <Part>
          <SearchInput value={searchValue} onChange={setSearchValue} />
          <SearchResults
            topics={topics}
            addedTopics={addedTopics}
            setAddedTopics={setAddedTopics}
          />
        </Part>

        {/* 하단 버튼 */}
        <Part>
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdCheck size="24" color={theme?.bg1} />}
            onClick={onRequestClose}
          >
            <Typography color={theme?.bg1} size="18px">
              완료
            </Typography>
          </StyledButton>
        </Part>
      </Content>
    </ReactModal>
  );
}
