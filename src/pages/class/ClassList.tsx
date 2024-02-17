import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteCourse, useCourses } from "../../api/course.ts";
import addClass from "../../assets/class/addClass.svg";
import AlertModal from "../../components/AlertModal.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import ClassItem from "../../components/class/ClassItem.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";

function ClassList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: classList } = useCourses();

  const { mutate: deleteClass } = useMutation({
    mutationFn: deleteCourse,
    mutationKey: ["deleteCourse"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();

  return (
    <>
      <Container>
        <TitleBar label="Classes">
          <PrimaryButton onClick={() => navigate("/class/create")}>
            Create New Class
          </PrimaryButton>
        </TitleBar>
        {classList != null &&
          (classList.length === 0 ? (
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
                  attendeeNumber={classItem.attendees.length}
                  color={"#ffffff"}
                  onDelete={() => {
                    setDeleteTarget(classItem.id);
                    openDeleteModal();
                  }}
                />
              ))}
            </ClassListContainer>
          ))}
      </Container>
      <AlertModal
        state={deleteModalState}
        type="delete"
        title="Delete Class?"
        content={
          <p>
            Are you sure you want to delete
            <p style={{ fontWeight: "700" }}>
              {classList?.find((c) => c.id === deleteTarget)?.name}
            </p>
            You can't undo this action.
          </p>
        }
        onCancel={() => {
          closeDeleteModal();
        }}
        onConfirm={() => {
          if (deleteTarget == null) {
            return;
          }
          deleteClass(deleteTarget);
          closeDeleteModal();
        }}
      />
    </>
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
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  & img {
    width: 15rem;
    height: 15rem;

    margin: 10rem 0 4rem 0;

    cursor: pointer;
  }

  & h1 {
    ${({ theme }) => theme.typography.h5};

    margin-bottom: 0.8rem;
  }

  & p {
    ${({ theme }) => theme.typography.b1};
  }
`;

const ClassListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  margin-bottom: 6rem;
  margin-left: 6.3rem;
  margin-right: auto;
`;

export default ClassList;
