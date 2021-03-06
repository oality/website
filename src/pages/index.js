import React from 'react';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import RichText from '../components/RichText';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

import './index.css';
// const nodes = query => (query ? query['edges'] : []).map(edge => edge.node);

const IndexPage = ({ data }) => (
  <Layout>
    <Container>
      {data.allPloneDocument.edges
        .filter(item => item.node._id === 'copy_of_front-page')
        .map(({ node }) => (
          <Row>
            <Col>
              <h2>{node.title}</h2>
              <RichText serialized={node.text.react} />
            </Col>
          </Row>
        ))}
    </Container>
    <Carousel>

      {data.allPloneDocument.edges
        .filter(
          item =>
            item.node._id !== 'nos-outils' &&
            item.node._id !== 'copy_of_front-page'
        )
        .map(({ node }, index) => (
          <Carousel.Item className={node._id}>
                <Img fluid={node.image.childImageSharp.fluid} />
            <Carousel.Caption>
              <h3>{node.title}</h3>
              <RichText serialized={node.text.react} />
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container>
      {data.allPloneDocument.edges
        .filter(item => item.node._id === 'nos-outils')
        .map(({ node }) => (
          <Row>
            <Col>
              <h2>{node.title}</h2>
              <RichText serialized={node.text.react} />
            </Col>
          </Row>
        ))}
    </Container>
    <Container>
      <Row>
        {[]
          .concat(data.allPloneFolder.edges, { node: data.ploneDocument })
          .map(({ node }, index) => (
            <Col as={Link} key={index} to={node._path} lg="4" md="6">
              <Row className="text-center justify-content-center font-weight-bold p-3">
                {node.title}
              </Row>
              <Img fluid={node.image.childImageSharp.fluid} />
              <Row className="text-center justify-content-center p-3">
                {node.description}
              </Row>
            </Col>
          ))}
      </Row>
    </Container>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    ploneDocument(_path: { in: ["/contact/"] }) {
      title
      description
      _path
      image {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
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
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allPloneDocument(
      filter: {
        _parent: { _path: { eq: "/" } }
        _path: { nin: ["/front-page/", "/contact/"] }
      }
      sort: { order: DESC, fields: created }
    ) {
      edges {
        node {
          title
          description
          _path
          _id
          text {
            react
          }
          image {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
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
