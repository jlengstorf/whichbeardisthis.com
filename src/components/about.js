import React from 'react';
import styled from '@emotion/styled';

const About = styled('footer')`
  margin-top: 4rem;
`;

const Subheading = styled('h2')`
  font-size: 1.5rem;
`;

const Credits = styled('p')`
  font-size: 0.875rem;
  margin-top: 2rem;
  text-align: center;

  a {
    text-decoration: none;
  }
`;

export default () => (
  <About>
    <Subheading>What is this site?</Subheading>
    <p>
      This website uses{' '}
      <a href="https://github.com/justadudewhohacks/face-api.js">face-api.js</a>{' '}
      for facial recognition. It was built by{' '}
      <a href="https://twitter.com/jlengstorf">Jason Lengstorf</a> and{' '}
      <a href="https://twitter.com/gantlaborde">Gant Laborde</a> as part of the{' '}
      <a href="https://www.youtube.com/watch?v=PNEDvkKcXf0&list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx&index=2">
        Learn Stuff with Jason
      </a>{' '}
      livestream series .
    </p>
    <Credits>
      <a href="https://github.com/jlengstorf/whichbeardisthis.com">
        see the source code
      </a>{' '}
      ·{' '}
      <a href="https://www.youtube.com/watch?v=PNEDvkKcXf0&list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx&index=2">
        watch us build it
      </a>
    </Credits>
  </About>
);
