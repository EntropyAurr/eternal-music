import { createContext, useContext } from "react";
import styled from "styled-components";
import Empty from "./Empty";

const StyledTable = styled.div`
  overflow: hidden;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  font-size: 1.4rem;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--color-grey-50);
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const TableContext = createContext();

export default function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty />;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
