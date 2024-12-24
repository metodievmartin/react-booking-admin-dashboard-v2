import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      // reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
};
