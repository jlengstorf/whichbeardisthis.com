import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Logo = styled(Img)`
  max-width: 100%;

  * {
    margin-top: 0;
  }
`;

const Header = styled('header')`
  margin: 0 auto 2rem;
`;

export default () => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "which-beard.jpg" }) {
          childImageSharp {
            sqip(numberOfPrimitives: 12, blur: 0) {
              dataURI
            }
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `}
    render={({ file }) => (
      <Header>
        <Logo
          fluid={{
            ...file.childImageSharp.fluid,
            base64: file.childImageSharp.sqip.dataURI,
          }}
          alt="Which beard is this?"
        />
      </Header>
    )}
  />
);
