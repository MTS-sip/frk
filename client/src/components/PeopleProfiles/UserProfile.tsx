// jwt authentication 
import React from 'react';
import { Card, Button } from 'semantic-ui-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>{user.email}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='green' onClick={onLogout}>Logout</Button>
      </Card.Content>
    </Card>
  );
};

export default UserProfile;