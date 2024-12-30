import styled from 'styled-components';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import Heading from '../../ui/Heading';

import { useDarkMode } from '../../hooks/useDarkMode';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function getStartData(isDarkMode) {
  return [
    {
      duration: '1 night',
      value: 0,
      color: isDarkMode ? '#b91c1c' : '#ef4444',
    },
    {
      duration: '2 nights',
      value: 0,
      color: isDarkMode ? '#c2410c' : '#f97316',
    },
    {
      duration: '3 nights',
      value: 0,
      color: isDarkMode ? '#a16207' : '#eab308',
    },
    {
      duration: '4-5 nights',
      value: 0,
      color: isDarkMode ? '#4d7c0f' : '#84cc16',
    },
    {
      duration: '6-7 nights',
      value: 0,
      color: isDarkMode ? '#15803d' : '#22c55e',
    },
    {
      duration: '8-14 nights',
      value: 0,
      color: isDarkMode ? '#0f766e' : '#14b8a6',
    },
    {
      duration: '15-21 nights',
      value: 0,
      color: isDarkMode ? '#1d4ed8' : '#3b82f6',
    },
    {
      duration: '21+ nights',
      value: 0,
      color: isDarkMode ? '#7e22ce' : '#a855f7',
    },
  ];
}

function prepareData(startData, stays) {
  // not ideal piece of code but it does the job

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.num_of_nights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const DurationChart = ({ confirmedStays }) => {
  const { isDarkMode } = useDarkMode();
  const startData = getStartData(isDarkMode);
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            paddingAngle={3}
            cx="40%"
            cy="50%"
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default DurationChart;
