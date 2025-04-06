import { styled } from "styled-components";
import Typography from "~/components/common/Typography";

export const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
`;

export const InfoContainer = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 10px;
`;

export const Info = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const InfoText = styled(Typography)`
  font-size: 18px;
`;
