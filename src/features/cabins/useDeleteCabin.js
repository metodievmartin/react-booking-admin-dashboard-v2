import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('Cabin deleted successfully!');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
};
