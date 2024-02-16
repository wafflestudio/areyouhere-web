import styled from "styled-components";

import dotsVerticalGrey from "../assets/class/dotsVerticalGrey.svg";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  background: none;
  border: none;
  background-image: url(${dotsVerticalGrey});

  cursor: pointer;
`;

const DropdownMenu = styled.div<{ isOpened: boolean }>`
  position: absolute;
  top: 2.4rem;
  right: 1.2rem;

  display: ${({ isOpened: isOpened }) => (isOpened ? "flex" : "none")};
  flex-direction: column;
  gap: 1px;
  box-shadow: ${({ theme }) => theme.effects.blur};

  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 0.8rem;
  overflow: hidden;

  z-index: 1;
`;

const DropdownMenuButton = styled.button`
  display: flex;
  flex-direction: row;
  padding: 1.1rem 2.1rem;
  gap: 3rem;

  ${({ theme }) => theme.typography.button1};
  border: none;
  background: none;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  transition: background-color 0.2s;
`;

export { DropdownContainer, DropdownButton, DropdownMenu, DropdownMenuButton };
