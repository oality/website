import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';
import { Container, Navbar, Nav } from 'react-bootstrap';

import './NavBar.css';

const NavBar = ({ active }) => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        file(relativePath: { eq: "Oality-150-white.png" }) {
          childImageSharp {
            fixed(width: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        ploneNavigation(_path: { eq: "/" }) {
          items {
            _id
            _path
            title
          }
        }
        allPloneFile(filter: { _backlinks: { eq: "/" } }) {
          edges {
            node {
              _path
            }
          }
        }
        allPloneImage(filter: { _backlinks: { eq: "/" } }) {
          edges {
            node {
              _path
            }
          }
        }
      }
    `}
    render={data => {
      const skip = ['/']
        .concat(data.allPloneFile.edges.map(edge => edge.node._path))
        .concat(data.allPloneImage.edges.map(edge => edge.node._path));
      return (
        <Navbar expand="lg" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="/">
              <Img fixed={data.file.childImageSharp.fixed} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" activeKey={active}>
                {data.ploneNavigation.items
                  .filter(item => !skip.includes(item._path))
                  .map((item, i) => (
                    <Nav.Link href={item._path} key={i}>{item.title}</Nav.Link>
                  ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }}
  />
);

export default NavBar;
