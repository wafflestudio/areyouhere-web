import styled from "styled-components";

import crossBlack from "../../assets/class/crossBlack.svg";

function ChipBox({
  attendeeList,
  removeChip,
}: {
  attendeeList: string[];
  removeChip: (index: number) => void;
}) {
  return (
    <ChipContainer>
      <p>
        Attendee List<span>{` (${attendeeList.length})`}</span>
      </p>
      {attendeeList.map((name, index) => (
        <Chip key={index} onClick={() => removeChip(index)}>
          <p>{name}</p>
          <img src={crossBlack} alt="delete" />
        </Chip>
      ))}
    </ChipContainer>
  );
}

const ChipContainer = styled.div`
  background-color: #eeeeee;
  width: 45rem;
  min-height: 14rem;
  height: auto;

  padding: 1rem;

  & p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #4f4f4f;
    margin-bottom: 1.5rem;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 2.8rem;
  padding: 0.5rem 1.2rem;
  margin: 0 0.5rem 0.5rem 0;

  background-color: #ffffff;
  border: 0.1rem solid #000000;
  border-radius: 1.6rem;
  cursor: pointer;

  & p {
    ${({ theme }) => theme.typography.button1};
    color: #4f4f4f;

    height: fit-content;
    max-width: 39rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }

  & img {
    margin-left: 0.5rem;
  }

  &:hover {
    & p {
      color: #000000;
    }

    & img {
      filter: invert(1);
    }
  }
`;

export default ChipBox;
