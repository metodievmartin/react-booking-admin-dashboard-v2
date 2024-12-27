import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export const useBookings = () => {
  const queryClient = useQueryClient();
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

  // Query
  const { isLoading, data, error } = useQuery({
    // adding 'filter' and 'sortBy' here will cause React Query to re-fetch the data if any of them changes
    queryKey: ['bookings', filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, page: currentPage }),
  });

  if (data) {
    bookings = data.bookings;
    totalResults = data.count;
  }

  // Pre-fetching
  // Pre-fetch the next and previous pages of bookings for a seamless pagination experience.
  const pageCount = Math.ceil(totalResults / PAGE_SIZE);

  // Ensure the next page exists to prevent unnecessary requests or errors.
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, currentPage + 1],
      queryFn: () => getBookings({ filter, sortBy, page: currentPage + 1 }),
    });
  }

  // Ensure the previous page exists to prevent unnecessary requests or errors.
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, currentPage - 1],
      queryFn: () => getBookings({ filter, sortBy, page: currentPage - 1 }),
    });
  }

  return { isLoading, bookings, totalResults, error };
};
