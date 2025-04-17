import React from 'react';
import { Table } from 'semantic-ui-react';

// Define the props for the SubcategoryRow component
interface SubcategoryRowProps {
  subcategory: string;
  amount: number;
}

// Define the SubcategoryRow component
const SubcategoryRow: React.FC<SubcategoryRowProps> = ({ subcategory, amount }) => {
  return (
    <Table.Row>
      <Table.Cell style={{ paddingLeft: '2em' }}>{subcategory}</Table.Cell>
      <Table.Cell textAlign="right" style={{ paddingLeft: '2em' }}>
        {amount.toFixed(2)}
      </Table.Cell>
    </Table.Row>
  );
};

export default SubcategoryRow;