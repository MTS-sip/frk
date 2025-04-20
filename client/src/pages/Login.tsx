import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';

const Login: React.FC = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      localStorage.setItem('id_token', data.login.token);
      navigate('/'); // Redirect to home/dashboard
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} error={!!error}>
      <Form.Input
        label="Username"
        name="username"
        type="text"
        placeholder="Enter your username"
        value={formState.username}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Password"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" primary>
        Login
      </Button>
      {error && <Message error header="Login Failed" content="Invalid credentials." />}
    </Form>
  );
};

export default Login;