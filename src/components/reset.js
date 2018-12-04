import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../config/styles';

const Text = styled('p')`
  text-align: center;
`;

const Button = styled('button')`
  background: ${colors.brand};
  border: none;
  border-radius: 0.25rem;
  color: ${colors.lightest};
  cursor: pointer;
  display: block;
  font-family: brandon-grotesque;
  font-weight: bold;
  margin: 1rem auto 0;
  padding: 0.5rem;
  text-transform: uppercase;
  width: 300px;
`;

export default ({ reset }) => (
  <>
    <Text>See another bald guy?</Text>
    <Button type="reset" onClick={reset}>
      Start over!
    </Button>
  </>
);
