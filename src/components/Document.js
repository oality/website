import React from 'react';
import { graphql } from 'gatsby';
import RichText from './RichText';
import { Jumbotron } from 'react-bootstrap';

const Document = ({ data, images = [], files = [] }) => (
  <Jumbotron>
  <article key={data._id}>
    <h1>{data.title}</h1>
    {data.description ? (
      <p>
        <strong>{data.description}</strong>
      </p>
    ) : null}
    {data.text ? (
      <RichText serialized={data.text.react} images={images} files={files} />
    ) : null}
  </article>
  </Jumbotron>
);

export default Document;

export const query = graphql`
  fragment Document on PloneDocument {
    id
    title
    description
    text {
      react
    }
    _path
  }
`;
