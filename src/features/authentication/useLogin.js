import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginAPI } from '../../services/apiAuth';

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Auth : ', error);
      toast.error('Provided email or password are incorrect.');
    },
  });

  return { login, isLoading };
};
