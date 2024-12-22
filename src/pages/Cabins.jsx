import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { useEffect } from 'react';
import { getCabins } from '../services/apiCabins.js';
import CabinTable from '../features/cabins/CabinTable.jsx';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
