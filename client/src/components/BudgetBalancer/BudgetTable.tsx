import React from 'react';
import { Table } from 'semantic-ui-react';
import RunningTotal from './RunningTotal';

// Example prop type for one user's budget
interface Subcategory {
  name: string;
  amount: number;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface BudgetTableProps {
  budget: Category[];
}

const BudgetTable: React.FC<BudgetTableProps> = ({ budget }) => {
  // Prepare the budgetData object to pass to RunningTotal
  const budgetData = {
    Income: 0,
    Housing: 0,
    Healthcare: 0,
    Rnr: 0,
    Food: 0,
    Transpo: 0
  };

  // Map through the budget array and sum subcategories
  budget.forEach(category => {
    const categoryTotal = category.subcategories.reduce((acc, sub) => acc + sub.amount, 0);
    if (budgetData.hasOwnProperty(category.name as keyof typeof budgetData)) {
      budgetData[category.name as keyof typeof budgetData] = categoryTotal;
    }
  });

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>

        <RunningTotal budgetData={budgetData} />
      </Table.Body>
    </Table>
  );
};

export default BudgetTable;