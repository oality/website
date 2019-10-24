import React from 'react';
import './Breadcrumbs.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container'

const Breadcrumbs = ({ data }) => (
  <Container fluid className="breadcrumb-container">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {data.items.map(item => (
        <Breadcrumb.Item href={item._path}>{item.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </Container>
);

export default Breadcrumbs;
