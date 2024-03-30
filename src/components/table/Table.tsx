import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 2rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.grey};
  overflow: hidden;
  table-layout: fixed;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary["50"]};
`;

const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.white};
`;

const TableHeadItem = styled.th`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme }) => theme.colors.black};
  padding: 1.5rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  text-align: left;
  vertical-align: middle;
`;

interface TableItemProps extends React.HTMLAttributes<HTMLTableCellElement> {
  to?: string;
}

const TableItem = ({ children, to, ...props }: TableItemProps) => {
  if (to) {
    return (
      <TableCell {...props}>
        <TableLinkWithPadding to={to}>{children}</TableLinkWithPadding>
      </TableCell>
    );
  }
  return <TableCellWithPadding {...props}>{children}</TableCellWithPadding>;
};

const TableCell = styled.td`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  vertical-align: middle;
`;

const TableCellWithPadding = styled(TableCell)`
  padding: 1.7rem 2.5rem;
`;

const TableLinkWithPadding = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1.7rem 2.5rem;
  width: 100%;
`;

const CheckboxHeadItem = styled.th`
  width: 2rem;
  text-align: center;
  vertical-align: middle;
  padding: 1.5rem 2.5rem 1.5rem 3rem;
`;

const CheckboxItem = styled.td`
  width: 2rem;
  text-align: center;
  vertical-align: middle;
  padding: 1.5rem 2.5rem 1.5rem 3rem;
`;

export {
  Table,
  TableHead,
  TableBody,
  TableHeadItem,
  TableItem,
  CheckboxHeadItem,
  CheckboxItem,
};
