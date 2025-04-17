import React from 'react';
import { Table } from 'semantic-ui-react';
import SubcategoryRow from './SubcategoryRow';

interface CategorySectionProps {
  category: string;
  amount: number;
  subcategories?: { [key: string]: number };
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, amount, subcategories }) => {
  return (
    <>
      <Table.Row>
        <Table.Cell>{category}</Table.Cell>
        <Table.Cell textAlign="right">{amount.toFixed(2)}</Table.Cell>
      </Table.Row>
      {subcategories &&
        Object.entries(subcategories).map(([subKey, subVal]) => (
          <SubcategoryRow key={subKey} subcategory={subKey} amount={subVal} />
        ))}
    </>
  );
};

export default CategorySection;