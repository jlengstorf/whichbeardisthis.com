import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../config/styles';

const Heading = styled('h1')`
  color: ${colors.darkest};
  font-size: 1.75rem;
  line-height: 1.1;
  text-align: center;
`;

const Image = styled('img')`
  display: block;
  margin: 1rem auto 0;
  width: 300px;
`;

const getHeading = (isKyle, isJason, file) => {
  if (isKyle && isJason) {
    return 'We can’t tell them apart either. ¯\\_(ツ)_/¯';
  }

  if (isKyle) {
    return 'This is Kyle Shevlin.';
  }

  if (isJason) {
    return 'This is Jason Lengstorf.';
  }

  return 'This must be someone else.';
};

export default ({ isKyle, isJason, file }) => (
  <>
    <Heading>{getHeading(isKyle, isJason)}</Heading>
    <Image src={file} alt="uploaded file" />
  </>
);
