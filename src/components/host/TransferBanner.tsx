// Host와 Attendees를 전환하기 위한 상단 배너입니다.

import { Link } from "react-router-dom";
import styled from "styled-components";

interface TransferBannerProps {
  from: "host" | "attendees";
}

function TransferBanner(props: TransferBannerProps) {
  return (
    <>
      {props.from === "host" ? (
        <BannerLink to="/">If you are an Attendee, click here!</BannerLink>
      ) : (
        <BannerLink to="/class">If you are the Host, click here!</BannerLink>
      )}
    </>
  );
}

const BannerLink = styled(Link)`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: white;
  ${({ theme }) => theme.typography.b3};
  text-decoration: none;
`;

export default TransferBanner;
