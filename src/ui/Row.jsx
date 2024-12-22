import styled, { css } from 'styled-components';

const horizontalStyles = css`
  justify-content: space-between;
  align-items: center;
`;

const verticalStyles = css`
  flex-direction: column;
  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;

  ${(props) => props.type === 'horizontal' && horizontalStyles}

  ${(props) => props.type === 'vertical' && verticalStyles}
`;

Row.defaultProps = {
  type: 'horizontal',
};

export default Row;
