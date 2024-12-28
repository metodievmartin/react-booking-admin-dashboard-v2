import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { updateBooking } from '../../services/apiBookings';

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        is_paid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked-in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isCheckingIn };
};
