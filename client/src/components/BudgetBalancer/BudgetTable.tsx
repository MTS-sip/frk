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
    <>
      <Table celled structured className="budget-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Budget Balancer</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">$</Table.HeaderCell>
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

    {/* Reveal effect */}
      <div
       style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '2em',
        textAlign: 'right', 
        }}
>
    <div className="ui move up reveal">
       <div className="visible content">
        <img
          src="/budget.png"
          className="ui small image"
          alt="budget"
          style={{ margin: 0 }} // prevent unwanted spacing
        />
      </div>
        <div className="hidden content">
         <img
           src="/piggie-bank.jpg"
           className="ui small image"
           alt="Piggie Bank Hover"
           style={{ margin: 0 }}
         />
      </div>
     </div>
    </div>
  </>
  );
};

export default BudgetTable;