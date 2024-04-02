import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { AttendeeInfo, ModalStateType, PickPartial } from "../../type.ts";
import { PrimaryButton } from "../Button.tsx";
import Modal from "../Modal.tsx";
import { StyledInput } from "../TextField.tsx";

interface NamesakeModalProps {
  state: ModalStateType;
  close: () => void;
  initialNamesakes: PickPartial<AttendeeInfo, "id">[][];
  attendeeList: string[];
  onSubmit: (attendees: PickPartial<AttendeeInfo, "id">[]) => void;
}

function NamesakeModal({
  close,
  state,
  initialNamesakes,
  attendeeList,
  onSubmit,
}: NamesakeModalProps) {
  const [namesakes, setNamesakes] = useState(initialNamesakes);

  const isResolved = useMemo(() => {
    return namesakes.every((namesakeGroup) => {
      const notes = namesakeGroup.map((namesake) => namesake.note);
      const noteSet = new Set(notes);
      return noteSet.size === notes.length;
    });
  }, [namesakes]);

  useEffect(() => {
    setNamesakes(initialNamesakes);
  }, [initialNamesakes]);

  return (
    <Modal onBackgroundClick={close} state={state}>
      <Container>
        <h4>Namesake alert</h4>
        <p style={{ marginTop: "1.5rem" }}>
          Attendees with identical names exist on the current list.
          <br />
          Fill in the note field for each attendee to create the class.
          <br />
          *This note will be visible to attendees.
        </p>
        <NamesakeGroupContainer style={{ marginTop: "3rem" }}>
          {namesakes.map((namesakeGroup, groupIdx) => (
            <>
              <NamesakeGroup key={groupIdx}>
                {namesakeGroup.map((namesake, index) => (
                  <NamesakeInputContainer key={index}>
                    <NamesakeLabelContainer>
                      <NamesakeInputLabel>{namesake.name}</NamesakeInputLabel>
                      {namesake.id != null && (
                        <NamesakeAlreadyExistChip>
                          Existing
                        </NamesakeAlreadyExistChip>
                      )}
                    </NamesakeLabelContainer>
                    <NamesakeInput
                      value={namesake.note}
                      onChange={(e) => {
                        const updatedNamesakes = namesakes.map((group, gIdx) =>
                          groupIdx === gIdx
                            ? group.map((namesake, nIdx) =>
                                index === nIdx
                                  ? { ...namesake, note: e.target.value }
                                  : namesake
                              )
                            : group
                        );
                        setNamesakes(updatedNamesakes);
                      }}
                      placeholder={"eg. email, student ID or A/B"}
                    />
                  </NamesakeInputContainer>
                ))}
              </NamesakeGroup>
              {groupIdx !== initialNamesakes.length - 1 && <Divider />}
            </>
          ))}
        </NamesakeGroupContainer>
        <ButtonContainer>
          <PrimaryButton
            disabled={!isResolved}
            style={{ width: "100%" }}
            onClick={() => {
              const updatedNewAttendees = attendeeList.map((attendee, idx) => {
                const namesake = namesakes
                  .flat()
                  .find((ns) => ns.index === idx);
                if (namesake && namesake.note) {
                  return { name: attendee, note: namesake.note };
                }
                return { name: attendee, note: "" };
              });

              const finalAttendees = [
                ...updatedNewAttendees,
                ...namesakes.flat().filter((ns) => ns.id),
              ];

              onSubmit(finalAttendees);
            }}
          >
            Confirm
          </PrimaryButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4rem;

  max-height: 80vh;
  overflow-y: auto;

  h4 {
    ${({ theme }) => theme.typography.h4};
    color: ${({ theme }) => theme.colors.primary[500]};
  }

  p {
    ${({ theme }) => theme.typography.b3};
    margin: 0;
    text-align: center;
  }
`;

const NamesakeGroupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const NamesakeGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Divider = styled.div`
  width: 100%;
  border-top: 1px dotted ${({ theme }) => theme.colors.primary["100"]};
`;

const NamesakeInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 1rem;
  gap: 1rem;
`;

const NamesakeLabelContainer = styled.div`
  width: 10.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NamesakeInputLabel = styled.span`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.black};

  overflow: hidden;
  text-overflow: ellipsis;
`;

const NamesakeAlreadyExistChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 0.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary["100"]};
  color: ${({ theme }) => theme.colors.primary["700"]};

  font-size: 1rem;
  line-height: 1.8rem;
  font-weight: 600;
`;

const NamesakeInput = styled(StyledInput)`
  flex: 1;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 3rem 1rem 0 1rem;
  box-sizing: border-box;
`;

export default NamesakeModal;
