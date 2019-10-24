import React from 'react';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import Document from '../components/Document';
import { Container, Row, Col } from 'react-bootstrap';

const nodes = query => (query ? query['edges'] : []).map(edge => edge.node);

const IndexPage = ({ data }) => (
  <Layout>
    <Document
      data={data.ploneDocument}
      images={nodes(data['allPloneImage'])}
      files={nodes(data['allPloneFile'])}
    />
    <hr style={{ background: '#e8eef2' }} />
    <Container>
      <Row>
        {[]
          .concat(data.allPloneFolder.edges, data.allPloneDocument.edges)
          .map(({ node }, index) => (
            <Col as={Link} key={index} to={node._path} >
                <Img resolutions={node.image.childImageSharp.fixed} />
                <Row>{node.title}</Row>
                <Row>{node.description}</Row>
            </Col>
          ))}
      </Row>
    </Container>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    ploneDocument(_path: { in: ["/frontpage/", "/front-page/"] }) {
      ...Document
    }
    allPloneFolder(
      filter: { _id: { in: ["services", "blog"] } }
      sort: { order: DESC, fields: id }
    ) {
      edges {
        node {
          title
          description
          _path
          image {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    allPloneDocument(filter: { _id: { in: ["contact"] } }) {
      edges {
        node {
          title
          description
          _path
          image {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    allPloneFile(
      filter: { _backlinks: { in: ["/frontpage/", "/front-page/"] } }
    ) {
      edges {
        node {
          ...File
        }
      }
    }
    allPloneImage(
      filter: { _backlinks: { in: ["/frontpage/", "/front-page/"] } }
    ) {
      edges {
        node {
          ...Image
        }
      }
    }
    ploneSite(_path: { eq: "/" }) {
      ...Site
    }
    allSitePloneFile: allPloneFile(filter: { _backlinks: { eq: "/" } }) {
      edges {
        node {
          ...File
        }
      }
    }
    allSitePloneImage: allPloneImage(filter: { _backlinks: { eq: "/" } }) {
      edges {
        node {
          ...Image
        }
      }
    }
  }
`;
