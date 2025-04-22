import React from 'react';
import { Table } from 'semantic-ui-react';

interface RunningTotalProps {
  income: number;
  expense: number;
}

const RunningTotal: React.FC<RunningTotalProps> = ({ income, expense }) => {
  const total = income - expense;
  return (
    <Table.Row>
      <Table.Cell><strong>Total</strong></Table.Cell>
      <Table.Cell textAlign="right"><strong>{total.toFixed(2)}</strong></Table.Cell>
    </Table.Row>
  );
};

export default RunningTotal;