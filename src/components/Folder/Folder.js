import React from 'react';
import { graphql, Link } from 'gatsby';
import RichText from '../RichText';

import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import './Folder.css';

const Folder = ({ data, title, images = [], files = [] }) => {
  const listedTypes = new Set([
    'Document',
    'Folder',
    'News Item',
    'Event',
    'Collection',
    'File',
  ]);
  let byPath = files.reduce(function(result, file) {
    result[file._path] = file;
    return result;
  }, {});
  return (
    <Jumbotron fluid>
      <Container>
        {title ? <h1>{title}</h1> : <h1>{data.title}</h1>}
        {data.description ? (
          <p>
            <strong>{data.description}</strong>
          </p>
        ) : null}
        {data.text ? (
          <RichText
            serialized={data.text.react}
            images={images}
            files={files}
          />
        ) : null}
        {data.items
          .filter(item => listedTypes.has(item._type))
          .map(item => (
            <Row>
              <Col key={item._id}>
                <h3>
                  {byPath[item._path] ? (
                    <a
                      href={byPath[item._path].file.publicURL}
                      download={byPath[item._path].file.filename}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link to={item._path}>{item.title}</Link>
                  )}
                </h3>
                {item.description ? <p>{item.description}</p> : null}
                {item.keys}
              </Col>
            </Row>
          ))}
      </Container>
    </Jumbotron>
  );
};

export default Folder;

export const query = graphql`
  fragment Site on PloneSite {
    id
    title
    items {
      _id
      _path
      _type
      description
      title
    }
    _path
  }

  fragment Folder on PloneFolder {
    id
    title
    description
    items {
      _id
      _path
      _type
      description
      title
    }
    image {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    _path
  }

  fragment Collection on PloneCollection {
    id
    title
    description
    text {
      react
    }
    items {
      _id
      _path
      _type
      description
      title
    }
    _path
  }
`;
