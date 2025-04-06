import { motion } from "motion/react";
import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
`;
export const MotionWrapper = motion.create(Wrapper);

export const TopicButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 10px;
`;

export const TopicName = styled(Typography)`
  word-break: break-all;
  white-space: nowrap;
  font-size: 16px;
`;
