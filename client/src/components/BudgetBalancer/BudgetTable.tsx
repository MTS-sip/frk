import React from 'react';
import { Table } from 'semantic-ui-react';
import CategorySection from './CategorySection';
import RunningTotal from './RunningTotal';

interface BudgetData {
  Income: number;
  Housing: number;
  Healthcare: number;
  Rnr: number;
  Food: number;
  Transpo: number;
}

interface BudgetTableProps {
  budgetData: BudgetData;
}

const BudgetTable: React.FC<BudgetTableProps> = ({ budgetData }) => {
  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Budget Balancer</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">$</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <CategorySection category="Income" amount={budgetData.Income} />
        <CategorySection category="Housing" amount={budgetData.Housing} />
        <CategorySection category="Healthcare" amount={budgetData.Healthcare} />
        <CategorySection category="Rnr" amount={budgetData.Rnr} />
        <CategorySection category="Food" amount={budgetData.Food} />
        <CategorySection category="Transpo" amount={budgetData.Transpo} />
        <RunningTotal budgetData={budgetData} />
      </Table.Body>
    </Table>
  );
};

export default BudgetTable;