import styled from 'styled-components';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';

import { useDarkMode } from '../../hooks/useDarkMode';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function getChartColours(isDarkMode) {
  if (isDarkMode) {
    return {
      totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
      extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
      text: '#e5e7eb',
      background: '#18212f',
    };
  }

  return {
    totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
    extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
    text: '#374151',
    background: '#fff',
  };
}

const SalesChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();
  const colors = getChartColours(isDarkMode);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce(
          (total, currentBooking) => total + currentBooking.total_price,
          0
        ),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce(
          (total, currentBooking) => total + currentBooking.extras_price,
          0
        ),
    };
  });

  const fromDate = format(allDates.at(0), 'MMM dd yyyy');
  const toDate = format(allDates.at(-1), 'MMM dd yyyy');

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {fromDate} &mdash; {toDate}
      </Heading>
      <ResponsiveContainer height={400} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid strokeDasharray="4" />

          <Tooltip contentStyle={{ background: colors.background }} />

          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />

          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
