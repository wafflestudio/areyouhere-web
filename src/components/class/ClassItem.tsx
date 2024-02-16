import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
      onClick={() => navigate(`/${id}`)}
    >
      <h4>{name}</h4>
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

  border: 0.1rem solid ${Theme.colors.grey};
  border-radius: 1rem;

  padding: 3.3rem;
  gap: 1.7rem;

  cursor: pointer;

  h4 {
    font-size: 2.4rem;
    width: 100%;
    height: 25%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 1.6rem;
    width: 100%;

    height: 5rem;
    white-space: normal;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
  }

  p.description {
    height: 60%;
  }

  p.attendeeNumber {
    height: 15%;
  }
`;

export default ClassItem;
