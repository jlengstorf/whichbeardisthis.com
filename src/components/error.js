import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../config/styles';

const Error = styled('p')`
  background-color: rgba(255, 0, 0, 0.05);
  border: 2px solid red;
  border-radius: 0.25rem;
  color: ${colors.darkest};
  padding: 1rem;
`;

export default ({ error }) => error && <Error>{error}</Error>;
