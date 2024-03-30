import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

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

const TableHeadItem = styled.th<{ noBorders?: boolean }>`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme }) => theme.colors.black};
  padding: 1.5rem 2.5rem;
  ${({ noBorders }) =>
    noBorders === true
      ? css`
          border: none;
        `
      : css`
          border: 1px solid ${({ theme }) => theme.colors.grey};
        `}
  text-align: left;
  vertical-align: middle;
`;

interface TableItemProps extends React.HTMLAttributes<HTMLTableCellElement> {
  to?: string;
  shrink?: boolean;
  noBorders?: boolean;
}

const TableItem = ({
  children,
  to,
  shrink = false,
  ...props
}: TableItemProps) => {
  if (to) {
    return (
      <TableCell {...props}>
        <TableLinkWithPadding to={to} shrink={shrink}>
          {children}
        </TableLinkWithPadding>
      </TableCell>
    );
  }
  return (
    <TableCellWithPadding {...props} shrink={shrink}>
      {children}
    </TableCellWithPadding>
  );
};

const TableCell = styled.td<{ noBorders?: boolean }>`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.black};
  ${({ noBorders }) =>
    noBorders === true
      ? css`
          border: none;
        `
      : css`
          border: 1px solid ${({ theme }) => theme.colors.grey};
        `}
  vertical-align: middle;
`;

const TableCellWithPadding = styled(TableCell)<{ shrink: boolean }>`
  ${({ shrink }) =>
    !shrink &&
    css`
      padding: 1.7rem 2.5rem;
    `}
`;

const TableLinkWithPadding = styled(Link)<{ shrink: boolean }>`
  display: block;
  text-decoration: none;
  color: inherit;
  ${({ shrink }) =>
    !shrink &&
    css`
      padding: 1.7rem 2.5rem;
    `}
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

interface SelectableTableRowProps {
  selected: boolean;
}

const TableRow = styled.tr`
  border: 1px solid ${({ theme }) => theme.colors.grey};
`;

const SelectableTableRow = styled(TableRow)<SelectableTableRowProps>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary["400"] : "white"};

  ${({ selected }) =>
    !selected &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary["50"]};
      }
    `}
`;

export {
  Table,
  TableHead,
  TableBody,
  TableHeadItem,
  TableItem,
  CheckboxHeadItem,
  CheckboxItem,
  TableRow,
  SelectableTableRow,
};
