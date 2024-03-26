import styled from "styled-components";

const SessionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 2rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.grey};
  overflow: hidden;
  table-layout: fixed;
`;

const SessionTableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary["50"]};
`;

const SessionTableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.white};
`;

const SessionTableHeadItem = styled.th`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme }) => theme.colors.black};
  padding: 1.5rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  text-align: left;
  vertical-align: middle;
`;

const SessionTableItem = styled.td`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.black};
  padding: 1.7rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  vertical-align: middle;
`;

export {
  SessionTable,
  SessionTableHead,
  SessionTableBody,
  SessionTableHeadItem,
  SessionTableItem,
};
