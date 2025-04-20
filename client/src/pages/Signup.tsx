// This file contains the Signup component for user registration.
// It uses Apollo Client for GraphQL mutations and Semantic UI for styling.
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';

const Signup: React.FC = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [signup, { error }] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { ...formState } });
      localStorage.setItem('id_token', data.signup.token);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} error={!!error}>
      <Form.Input
        label="Username"
        name="username"
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
        Sign Up
      </Button>
      {error && <Message error header="Signup Failed" content="Please try again." />}
    </Form>
  );
};

export default Signup;