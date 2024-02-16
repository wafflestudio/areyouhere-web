import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import addClass from "../../assets/class/addClass.svg";
import { PrimaryButton } from "../../components/Button.tsx";
import ClassItem from "../../components/class/ClassItem.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import classData from "../../test/classData.json";

function ClassList() {
  const navigate = useNavigate();

  const [classList, setClassList] = useState(classData.data);

  useEffect(() => {
    // TODO: fetch class list
  }, []);

  return (
    <Container>
      <TitleBar label="Classes">
        <PrimaryButton onClick={() => navigate("/class/create")}>
          New Class
        </PrimaryButton>
      </TitleBar>
      {classList.length === 0 ? (
        <EmptyClassContainer>
          <img
            src={addClass}
            alt="Add Class"
            onClick={() => navigate("/class/create")}
          />
          <h1>You don't have any classes yet.</h1>
          <p>Click here to create your first class.</p>
        </EmptyClassContainer>
      ) : (
        <ClassListContainer>
          {classList.map((classItem) => (
            <ClassItem
              key={classItem.id}
              id={classItem.id}
              name={classItem.name}
              description={classItem.description}
              attendeeNumber={classItem.attendeeNumber}
              color={classItem.color}
            />
          ))}
        </ClassListContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  align-self: center;

  & img {
    width: 15rem;
    height: 15rem;

    margin: 10rem 0 3rem 0;

    cursor: pointer;
  }

  & h1 {
    font-size: 2.5rem;
    font-weight: 500;

    margin-bottom: 1.5rem;
  }

  & p {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

const ClassListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  margin-bottom: 6rem;
`;

export default ClassList;
