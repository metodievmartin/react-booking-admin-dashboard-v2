import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'start_date-desc',
            label: 'Sort by Date (Newest to Oldest)',
          },
          { value: 'start_date-asc', label: 'Sort by Date (Oldest to Newest)' },
          {
            value: 'total_price-desc',
            label: 'Sort by amount (Highest to Lowest)',
          },
          {
            value: 'total_price-asc',
            label: 'Sort by amount (Lowest to Highest)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
