import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import Stat from './Stat';

import { formatCurrency } from '../../utils/helpers';

const Stats = ({ bookings = [], confirmedStays = [], numDays, cabinCount }) => {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce(
    (total, booking) => total + booking.total_price,
    0
  );
  const totalCheckins = confirmedStays.length;

  // this is a simple and not a very accurate calculation but does the job well enough for this use case
  // the total of all confirmed stays is divided by the total available nights that could've been booked
  const totalNightsStayed = confirmedStays.reduce(
    (totalNights, stay) => totalNights + stay.num_of_nights,
    0
  );
  const occupationRate = totalNightsStayed / (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check-Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupationRate * 100)}%`}
      />
    </>
  );
};

export default Stats;
