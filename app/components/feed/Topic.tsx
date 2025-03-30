import { useContext, type Ref } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdClose } from "react-icons/md";
import { motion } from "motion/react";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

const TopicButton = styled(Button)`
  height: 36px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 15px;
`;

const TopicName = styled(Typography)`
  word-break: break-all;
  white-space: nowrap;
`;

interface TopicProps {
  topic: string;
  onClick: () => void;
  ref?: Ref<HTMLButtonElement>;
}

export default function Topic({ topic, onClick, ref }: TopicProps) {
  const theme = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ width: 0, marginRight: 0 }}
      animate={{ width: "auto", marginRight: "7px" }}
      exit={{ width: 0, marginRight: 0 }}
      transition={{
        type: "spring",
        duration: 0.7,
      }}
      style={{
        borderRadius: "10px",
        display: "flex",
        justifyContent: "flex-start",
        flexShrink: 0,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <TopicButton
          backgroundColor={theme?.bg2}
          icon={<MdClose size="14" color={theme?.grey2} />}
          iconPosition="right"
          onClick={onClick}
          ref={ref}
        >
          <TopicName color={theme?.grey1} size="16px">
            {topic}
          </TopicName>
        </TopicButton>
      </motion.div>
    </motion.div>
  );
}
