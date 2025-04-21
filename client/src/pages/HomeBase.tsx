import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BUDGET } from '../utils/queries';
import BudgetTable from '../components/BudgetBalancer/BudgetTable';
import { Reveal, Image, Modal, Form, Dropdown, Button } from 'semantic-ui-react';
import InputField from '../components/Common/InputField';
import SaveButton from '../components/Common/SaveButton';
import { UPDATE_SUBCATEGORY } from '../utils/mutations';

const HomeBase: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_BUDGET, {
    fetchPolicy: 'network-only',
  });
  
  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      refetch();
    }
  }, []);

  const [budgetData, setBudgetData] = useState({
    Income: 0,
    Housing: 0,
    Healthcare: 0,
    Rnr: 0,
    Food: 0,
    Transpo: 0
  });
  
 console.log(data)
 useEffect(() => {
  if (data && data.getBudget) {
    const categoryMap: Record<string, number> = {};
    data.getBudget.forEach((cat: any) => {
      categoryMap[cat.name] = cat.subcategories.reduce(
        (sum: number, sub: any) => sum + sub.amount,
        0
      );
    });

    setBudgetData({
      Income: categoryMap['Income'] || 0,
      Housing: categoryMap['Housing'] || 0,
      Healthcare: categoryMap['Healthcare'] || 0,
      Rnr: categoryMap['Rnr'] || 0,
      Food: categoryMap['Food'] || 0,
      Transpo: categoryMap['Transpo'] || 0
    });
  }
}, [data]);

  // Modal for adding subcategory
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryAmount, setNewSubcategoryAmount] = useState(0);

    // Mutation to add a subcategory
  const [updateSubcategory] = useMutation(UPDATE_SUBCATEGORY);

  const handleAddSubcategory = async () => {
    try {
     await updateSubcategory({
    variables: {
      categoryName: selectedCategory,
       subcategoryInput: {
        name: newSubcategoryName,
        amount: newSubcategoryAmount,
      },
    },
  });

  // Optionally refetch budget data after
  refetch?.();
  setModalOpen(false);
  setNewSubcategoryName('');
  setNewSubcategoryAmount(0);
} catch (error) {
  console.error('Failed to update subcategory:', error);
}
};

  const categoryOptions = [
    { key: 'Income', text: 'Income', value: 'Income' },
    { key: 'Housing', text: 'Housing', value: 'Housing' },
    { key: 'Healthcare', text: 'Healthcare', value: 'Healthcare' },
    { key: 'Rnr', text: 'Rnr', value: 'Rnr' },
    { key: 'Food', text: 'Food', value: 'Food' },
    { key: 'Transpo', text: 'Transpo', value: 'Transpo' }
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading budget data.</p>;

  return (
    <div>
      <Reveal animated='move'>
        <Reveal.Content visible>
          <Image src="/assets/placeholder.jpg" fluid />
        </Reveal.Content>
        <Reveal.Content hidden>
          <BudgetTable budgetData={budgetData} />
        </Reveal.Content>
      </Reveal>
      <Button onClick={() => setModalOpen(true)} primary style={{ marginTop: '1em' }}>
        Add Subcategory
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Add New Subcategory</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Select Category</label>
              <Dropdown
                placeholder='Select Category'
                fluid
                selection
                options={categoryOptions}
                onChange={(_, { value }) => setSelectedCategory(value as string)}
              />
            </Form.Field>
            <InputField
              label="Subcategory Name"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
              placeholder="New Subcategory"
            />
            <InputField
              label="Amount"
              value={newSubcategoryAmount}
              onChange={(e) => setNewSubcategoryAmount(Number(e.target.value))}
              placeholder="Enter Amount"
              type="number"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <SaveButton onClick={handleAddSubcategory} />
        </Modal.Actions>
      </Modal>
      {/* Display category details */}
      <div style={{ marginTop: '2em' }}>
        <h3>{selectedCategory || 'Category Details'}</h3>
        <p>Subcategory details for {selectedCategory || 'selected category'} will be shown here.</p>
      </div>
    </div>
  );
};

export default HomeBase;