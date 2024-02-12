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
        <BannerLink to="/attendees">If you are Attendees</BannerLink>
      ) : (
        <BannerLink to="/admin">If you are Admin</BannerLink>
      )}
    </>
  );
}

const BannerLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 19px;
  background-color: #6b6b6b;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
`;

export default TransferBanner;
