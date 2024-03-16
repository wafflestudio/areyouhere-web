// Admin과 Attendees를 전환하기 위한 상단 배너입니다.

import { Link } from "react-router-dom";
import styled from "styled-components";

interface TransferBannerProps {
  from: "admin" | "attendees";
}

function TransferBanner(props: TransferBannerProps) {
  return (
    <>
      {props.from === "admin" ? (
        <BannerLink from={props.from} to="/">
          If you are Attendees
        </BannerLink>
      ) : (
        <BannerLink from={props.from} to="/class">
          If you are Admin
        </BannerLink>
      )}
    </>
  );
}

const BannerLink = styled(Link)<{ from: "admin" | "attendees" }>`
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
