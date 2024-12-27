import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sorting
  const sortByRaw = searchParams.get('sort_by') || 'start_date-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };
  let bookings = [];
  let totalResults = 0;

  // Pagination
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;

  const { isLoading, data, error } = useQuery({
    // adding 'filter' and 'sortBy' here will cause React Query to re-fetch the data if any of them changes
    queryKey: ['bookings', filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, page: currentPage }),
  });

  if (data) {
    bookings = data.bookings;
    totalResults = data.count;
  }

  return { isLoading, bookings, totalResults, error };
};
