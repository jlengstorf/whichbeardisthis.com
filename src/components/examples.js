import React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { colors } from '../config/styles';

const Examples = styled('div')`
  display: flex;
  overflow-x: scroll;
  padding: 0.5rem 0;
  position: relative;

  ::before {
    background: ${colors.lightest}dd;
    border-radius: 1rem;
    content: ' ';
    cursor: not-allowed;
    bottom: 0;
    display: ${props => (props.loading ? `block` : `none`)};
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 500ms linear;
    z-index: 10;
  }

  * + * {
    margin-top: 0;
  }
`;

const Example = styled(Image)`
  flex: 1 80px;
  margin: 0.5rem;
  min-width: 80px;

  * {
    margin: 0;
  }
`;

export default ({ loading, handleClick }) => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { relativePath: { glob: "examples/*.jpg" } }) {
          edges {
            node {
              id
              childImageSharp {
                original {
                  src
                }
                sqip(numberOfPrimitives: 12, blur: 0) {
                  dataURI
                }
                fluid(maxWidth: 150) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Examples loading={loading}>
        {data.allFile.edges.map(({ node: image }) => (
          <a
            key={`example-${image.id}`}
            disabled={loading}
            href="#example"
            onClick={event => {
              event.preventDefault();
              handleClick(image.childImageSharp.original.src);
            }}
          >
            <Example
              fluid={{
                ...image.childImageSharp.fluid,
                base64: image.childImageSharp.sqip.dataURI,
              }}
              alt="Choose this to see who is in the image."
            />
          </a>
        ))}
      </Examples>
    )}
  />
);
