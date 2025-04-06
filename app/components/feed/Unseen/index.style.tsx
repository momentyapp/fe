import { motion } from "motion/react";
import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

const Wrapper = styled(Button)`
  padding: 10px;
  width: 180px;
  box-shadow: 0 0 3px ${(props) => props.theme.primary3};
  position: fixed;
  top: 120px;
  left: calc(50vw - 90px);
`;
export const MotionWrapper = motion.create(Wrapper);

export const ButtonText = styled(Typography)`
  font-size: 14px;
`;
