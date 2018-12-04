import React from 'react';
import Dropzone from 'react-dropzone';
import styled from '@emotion/styled';
import { colors } from '../config/styles';

const Drop = styled(Dropzone)`
  align-items: center;
  background-color: ${colors.light};
  border: 2px dashed ${colors.darkest};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  height: 150px;
  margin-top: 2rem;
  padding: 2rem;
`;

const HelpText = styled('p')`
  flex: 1;
  max-width: 300px;
  text-align: center;
`;

export default ({ handleDrop, handleError }) => (
  <Drop
    accept="image/jpeg, image/png"
    onDrop={accepted => {
      const file = accepted[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsDataURL = reader.result;

        handleDrop(fileAsDataURL);
      };

      try {
        reader.readAsDataURL(file);
      } catch (error) {
        handleError(
          'There was an error with the uploaded file.  Only JPG and PNG images are accepted.'
        );
      }
    }}
    activeStyle={{ borderStyle: 'solid' }}
  >
    <HelpText>
      Drop an image here or click to choose an image from your device.
    </HelpText>
  </Drop>
);
