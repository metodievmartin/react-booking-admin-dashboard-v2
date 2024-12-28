import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBooking as deleteCabinAPI } from '../../services/apiBookings';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success('Booking deleted successfully!');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteBooking };
};
