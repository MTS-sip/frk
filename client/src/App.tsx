import React from 'react';
import { Outlet } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Menu, Button } from 'semantic-ui-react';


// Defines funtional component: App for layout styling   
const App: React.FC = () => {
  return (
    <div>
      {/* Header title and logout button, styled with muted pink bacground*/}
      <Menu style={{ backgroundColor: '#e8d8d8' }} borderless>

        {/* Left aligned header title */}
        <Menu.Item header style={{ color: 'green', fontSize: '1.5em' }}>
          Budgetizer
        </Menu.Item>
       
        {/* Right aligned logout button */}
        <Menu.Menu position="right">
          <Menu.Item>
            <Button basic color="green">Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
        
        {/* Main content area with light green background */} 
      <Container style={{ backgroundColor: '#d0f0c0', minHeight: '100vh', padding: '2em' }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default App;