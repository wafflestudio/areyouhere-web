// 버튼 아래에 들어가는 링크 컴포넌트

import { Link } from "react-router-dom";
import styled from "styled-components";

const OptionalActionLabel = styled.p`
  font-size: 1.6rem;
  color: #4f4f4f;
  font-weight: 400;
  text-align: center;
`;

const OptionalActionLink = styled(Link)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primaryBlue};
  text-decoration: none;
  font-weight: bold;
`;

export { OptionalActionLabel, OptionalActionLink };