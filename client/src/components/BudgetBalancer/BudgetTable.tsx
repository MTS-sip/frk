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
  selectedCategory: string;
  newSubcategoryName: string;
  newSubcategoryAmount: number;
}

const BudgetTable: React.FC<BudgetTableProps> = ({
  budgetData,
  selectedCategory,
  newSubcategoryName,
  newSubcategoryAmount
}) => {
  return (
    <>
      <Table celled structured className="budget-table">
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

      {/* NEW: Display selected category details */}
      <div style={{ marginTop: '2em', padding: '1em', border: '2px dashed green', borderRadius: '8px' }}>
        <h3>Selected Category: {selectedCategory || 'None'}</h3>
        {selectedCategory ? (
          <>
            <p><strong>Subcategory:</strong> {newSubcategoryName || 'None'}</p>
            <p><strong>Amount:</strong> {newSubcategoryAmount ? `$${newSubcategoryAmount.toFixed(2)}` : '0.00'}</p>
          </>
        ) : (
          <p>Choose a category and fill in details to add a subcategory.</p>
        )}
      </div>

      {/* Reveal effect placed below table and right-aligned */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2em' }}>
        <div className="ui move up reveal">
          <div className="visible content">
            <img
              src="/budget.png"
              className="ui small image"
              alt="budget"
            />
          </div>
          <div className="hidden content">
            <img
              src="/piggie-bank.png"
              className="ui small image"
              alt="Piggie Bank Hover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetTable;