import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdCheck } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";

import SearchInput from "./SearchInput";

import type { Topic } from "common";
import SearchResults from "./SearchResults";

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

interface TopicModalProps extends ReactModal.Props {
  addedTopicIds: number[];
  onAddTopic: (topic: Topic) => void;
  onRemoveTopic: (topicId: number) => void;
}

export default function TopicModal({
  addedTopicIds,
  onAddTopic,
  onRemoveTopic,
  style,
  onRequestClose,
  ...props
}: TopicModalProps) {
  const theme = useContext(ThemeContext);

  const [searchValue, setSearchValue] = useState("");
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      topic: "토픽11111111111",
      enabled: true,
      count: 200,
      trending: true,
    },
  ]);

  return (
    <ReactModal closeTimeoutMS={200} {...props}>
      <Content>
        <Part>
          {/* 검색 */}
          <SearchInput value={searchValue} onChange={setSearchValue} />

          {/* 검색 결과 */}
          <SearchResults topics={topics} />
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
