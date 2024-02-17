import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import dotsVerticalGrey from "../../assets/class/dotsVerticalGrey.svg";
import Theme from "../../styles/Theme.tsx";

interface ClassItemProps {
  id: number;
  name: string;
  description: string;
  attendeeNumber: number;
  color: string;
}

function ClassItem({
  id,
  name,
  description,
  attendeeNumber,
  color,
}: ClassItemProps) {
  const navigate = useNavigate();

  return (
    <Container
      style={{ backgroundColor: color }}
      onClick={() => navigate(`/class/${id}`)}
    >
      <h4>{name}</h4>
      <img src={dotsVerticalGrey} alt="menu" />
      <p className="description">{description}</p>
      <p className="attendeeNumber">{attendeeNumber}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 36rem;
  height: 24rem;
  gap: 1.7rem;

  border: 0.1rem solid ${Theme.colors.grey};
  border-radius: 1rem;

  padding: 3.3rem;

  cursor: pointer;
  position: relative;

  h4 {
    width: 100%;
    height: 3.2rem;

    ${({ theme }) => theme.typography.h4};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    width: 100%;

    ${({ theme }) => theme.typography.b3};
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
  }

  p.description {
    height: 10rem;
  }

  p.attendeeNumber {
    height: 2rem;
  }

  &:hover img {
    opacity: 1;
  }

  img {
    position: absolute;
    top: 2.4rem;
    right: 1.2rem;

    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export default ClassItem;
