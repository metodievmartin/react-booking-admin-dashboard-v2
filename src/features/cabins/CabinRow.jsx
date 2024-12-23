import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { formatCurrency } from '../../utils/helpers.js';
import { deleteCabin } from '../../services/apiCabins.js';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const {
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    id: cabinID,
  } = cabin;

  const [showEdit, setShowEdit] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('Cabin deleted successfully!');
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button
            data-cabin-id={cabinID}
            onClick={() => setShowEdit((showEdit) => !showEdit)}
            disabled={isLoading}
          >
            Edit
          </button>
          <button
            data-cabin-id={cabinID}
            onClick={() => mutate(cabinID)}
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showEdit && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;
