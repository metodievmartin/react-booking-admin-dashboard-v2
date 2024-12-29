import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateCurrentUserAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isLoading } = useMutation({
    mutationFn: updateCurrentUserAPI,
    onSuccess: ({ data }) => {
      toast.success('Current user updated successfully.');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateCurrentUser, isLoading };
};
