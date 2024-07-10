import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import bubbleTip from "../assets/support/bubbleTip.svg";
import contactSupport from "../assets/support/contactSupport.svg";
import feedback from "../assets/support/feedback.svg";
import questionMark from "../assets/support/questionMark.svg";

const FloatingSupportButton = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  console.log(showBubble, showMenu);

  return (
    <Container
      clickable={showMenu}
      onClick={() => {
        setShowMenu(false);
        setShowBubble(false);
      }}
    >
      <ContextContainer>
        <ReportBubble style={{ opacity: showBubble ? 1 : 0 }}>
          <ReportBubbleContent>Help</ReportBubbleContent>
          <BubbleTipImg src={bubbleTip} alt="Bubble Tip" />
        </ReportBubble>
        <ReportMenuContainer style={{ opacity: showMenu ? 1 : 0 }}>
          <ReportMenuLink to="/support">
            <img src={contactSupport} alt="Contact Support" />
            Contact Support
          </ReportMenuLink>
          <Divider />
          <ReportMenuLink to="https://tally.so/r/w7WY6P" target="_blank">
            <img src={feedback} alt="Feedback" />
            Feedback
          </ReportMenuLink>
        </ReportMenuContainer>
      </ContextContainer>
      <ReportIconButton
        onMouseEnter={() => {
          if (!showMenu) setShowBubble(true);
        }}
        onMouseLeave={() => {
          setShowBubble(false);
        }}
        onClick={(e) => {
          setShowMenu(true);
          setShowBubble(false);
          e.stopPropagation();
        }}
      >
        <img src={questionMark} alt="Report" />
      </ReportIconButton>
    </Container>
  );
};

const Container = styled.div<{ clickable?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;

  pointer-events: ${({ clickable }) => (clickable ? "auto" : "none")};
`;

const ContextContainer = styled.div`
  position: relative;
  margin-right: 0.6rem;
  width: 100%;
`;

const ReportIconButton = styled.button`
  width: 4rem;
  height: 4rem;
  padding: 0.4rem;
  box-sizing: border-box;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  color: #434343;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    background-color: #e1e1e1;
  }
`;

const ReportBubble = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  padding-right: 1.2rem;
`;

const ReportBubbleContent = styled.div`
  display: flex;

  background-color: rgba(0, 0, 0, 0.65);
  padding: 0.95rem 1.5rem;
  border-radius: 1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.b3};
`;

const BubbleTipImg = styled.img`
  position: absolute;
  bottom: 1rem;
  right: 0rem;
  width: 1.2rem;
  height: 1.7rem;
`;

const ReportMenuContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0.6rem;

  display: flex;
  flex-direction: column;

  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 0.8rem;
`;

const ReportMenuLink = styled(Link)`
  display: flex;
  flex-direction: row;

  padding: 0.9rem 1.1rem;
  gap: 0.6rem;

  ${({ theme }) => theme.typography.button1};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkGrey};

  > img {
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }

  pointer-events: auto;
`;

const Divider = styled.div`
  padding-top: 1px;
  background-color: ${({ theme }) => theme.colors.grey};
`;

export default FloatingSupportButton;
