import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Outlet } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Button } from 'semantic-ui-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id_token');

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    navigate('/login');
  };

  return (
    <div>
      <Menu style={{ backgroundColor: '#e8d8d8' }} borderless>
        <Menu.Item header style={{ color: 'green', fontSize: '3.5em' }}>
          Budgetizer
        </Menu.Item>

        <Menu.Menu position="right">
          {!token && (
            <>
              <Menu.Item>
                <Link to="/signup">
                  <Button basic color="green">Sign Up</Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/login">
                  <Button basic color="green">Login</Button>
                </Link>
              </Menu.Item>
            </>
          )}
          {token && (
            <Menu.Item>
              <Button basic color="green" onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>

      {/*  Full-width background without <Container> */}
      <div style={{ backgroundColor: '#d0f0c0', minHeight: '100vh', padding: '2em' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;