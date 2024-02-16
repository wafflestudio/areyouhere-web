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
        <BannerLink from={props.from} to="/admin">
          If you are Admin
        </BannerLink>
      )}
    </>
  );
}

const BannerLink = styled(Link)<{ from: "admin" | "attendees" }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #000000;
  color: white;
  ${({ theme }) => theme.typography.b3};
  text-decoration: none;
`;

export default TransferBanner;
