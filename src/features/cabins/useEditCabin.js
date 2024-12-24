import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEditCabin } from '../../services/apiCabins';

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Changes saved successfully!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditing, editCabin };
};
