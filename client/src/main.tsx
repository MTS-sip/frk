import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import RequireAuth from './utils/RequireAuth';
import HomeBase from './pages/HomeBase';
import UiUx from './pages/UiUx'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

//Render deployment
console.log("GraphQL URI is:", import.meta.env.VITE_GRAPHQL_URI);

import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RequireAuth><HomeBase /></RequireAuth> },
      { path: '/uiux', element: <RequireAuth><UiUx /></RequireAuth> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
 
    ],
  },
]);

//  define rootElement prior to using it
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
} else {
  console.error("Root element not found.");
}