import React from 'react';
import { Table } from 'semantic-ui-react';

// Define the props for the RunningTotal component
interface RunningTotalProps {
  budgetData: {
    Income: number;
    Housing: number;
    Healthcare: number;
    Rnr: number;
    Food: number;
    Transpo: number;
  }
}

const RunningTotal: React.FC<RunningTotalProps> = ({ budgetData }) => {
  const total =
    budgetData.Income +
    budgetData.Housing +
    budgetData.Healthcare +
    budgetData.Rnr +
    budgetData.Food +
    budgetData.Transpo;
    
  return (
    <Table.Row>
      <Table.Cell><strong>Total</strong></Table.Cell>
      <Table.Cell textAlign="right"><strong>{total.toFixed(2)}</strong></Table.Cell>
    </Table.Row>
  );
};

export default RunningTotal;