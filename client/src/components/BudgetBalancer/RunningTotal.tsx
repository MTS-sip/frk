import React from 'react';
import { Table } from 'semantic-ui-react';

interface BudgetData {
  Income: number;
  Housing: number;
  Healthcare: number;
  Rnr: number;
  Food: number;
  Transpo: number;
}

interface RunningTotalProps {
  budgetData: BudgetData;
}

const RunningTotal: React.FC<RunningTotalProps> = ({ budgetData }) => {
  const { Income, ...expenses } = budgetData;

  const totalExpenses = Object.values(expenses).reduce((acc, amt) => acc + amt, 0);
  const runningTotal = Income - totalExpenses;

  return (
    <Table.Row>
      <Table.Cell>
        <strong>Total</strong>
      </Table.Cell>
       <Table.Cell textAlign="center">
        <strong>{runningTotal.toFixed(2)}</strong>
       </Table.Cell>
    </Table.Row>
  );
};

export default RunningTotal;