import { styled } from "styled-components";
import ReactModal from "react-modal";

import type { Topic } from "common";

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
  ...props
}: TopicModalProps) {
  return <ReactModal closeTimeoutMS={200} {...props} />;
}
