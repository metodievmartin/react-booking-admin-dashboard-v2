import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';

import { useUser } from '../features/authentication/useUser';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const { isLoading, user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // If there's NO authenticated user after the loading has finished, redirect to the /login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // While loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // If there is a user, render the app
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
