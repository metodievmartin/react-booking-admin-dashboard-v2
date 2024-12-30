import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const TodayItem = ({ activity }) => {
  const { id, status, guests, num_of_nights } = activity;
  const isArriving = status === 'unconfirmed';
  const isLeaving = status === 'checked-in';

  return (
    <StyledTodayItem>
      {isArriving && <Tag type="green">Arriving</Tag>}
      {isLeaving && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.country_flag} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.full_name}</Guest>
      <div>{num_of_nights} nights</div>

      {isArriving && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check In
        </Button>
      )}

      {isLeaving && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
