 import React from 'react';
 import { useParams } from 'react-router-dom';
 import { useQuery } from '@apollo/client';
 import { GET_USER } from '../utils/queries';

 const UiUx: React.FC = () => {
   const { category } = useParams();
    const { data, loading, error } = useQuery(GET_USER, {
    variables: { category }
   });

   if (loading) return <p>Loading UI/UX details...</p>;
  if (error) return <p>Error loading details.</p>;

  return (
    <div>
       <h2>{category} Details</h2>
       <pre>{JSON.stringify(data, null, 2)}</pre>
     </div>
  );
};

 export default UiUx;
