import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

import { getStaysAfterDate } from '../../services/apiBookings';

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter((stay) => {
    return stay.status === 'checked-in' || stay.status === 'checked-out';
  });

  return { isLoading, stays, confirmedStays, numDays };
};
