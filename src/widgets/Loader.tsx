import styled from '@emotion/styled';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: React.FC = () => {
  return (
    <StyleSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </StyleSpinner>
  );
};

const StyleSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default Loader;
