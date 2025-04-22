import React from 'react';
import { Table } from 'semantic-ui-react';
import CategorySection from './CategorySection';

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
  const calculateCategoryTotal = (subcategories: Subcategory[]) =>
    subcategories.reduce((sum, sub) => sum + sub.amount, 0);

  const totals = budget.reduce(
    (acc, category) => {
      const total = calculateCategoryTotal(category.subcategories);
      if (category.name === 'Income') {
        acc.income += total;
      } else {
        acc.expense += total;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const runningTotal = totals.income - totals.expense;

  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Amount ($)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {budget.map((category) => (
          <CategorySection
            key={category.name}
            category={category.name}
            amount={calculateCategoryTotal(category.subcategories)}
            subcategories={category.subcategories.reduce((acc, sub) => {
              acc[sub.name] = sub.amount;
              return acc;
            }, {} as Record<string, number>)}
          />
        ))}
        <Table.Row>
          <Table.Cell>
            <strong>Total</strong>
          </Table.Cell>
          <Table.Cell textAlign="right">
            <strong>{runningTotal.toFixed(2)}</strong>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BudgetTable;