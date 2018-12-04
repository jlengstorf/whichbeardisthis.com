import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { colors } from '../config/styles';
import Header from './header';

const Layout = styled('main')`
  margin: 5% auto;
  max-width: 90%;
  width: 600px;
`;

export default ({ children }) => (
  <Layout>
    <Helmet defaultTitle="Which Beard Is This?">
      <html lang="en" />
      <link rel="preconnect" href="https://use.typekit.net" />
      <link rel="preconnect" href="https://p.typekit.net" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link rel="stylesheet" href="https://use.typekit.net/nol4skp.css" />
    </Helmet>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;

          + * {
            margin-top: 1rem;
          }
        }

        html,
        body {
          background-color: ${colors.lightest};
          color: ${colors.dark};
          font-family: brandon-grotesque, sans-serif;
          font-size: 18px;

          @media (min-width: 400px) {
            font-size: 22px;
          }
        }
      `}
    />
    <Header />
    {children}
  </Layout>
);
