import React from 'react';
import { graphql } from 'gatsby';
import RichText from './RichText';
import { Jumbotron } from 'react-bootstrap';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import './Document.css';

const Document = ({ data, images = [], files = [] }) => {
  var hasMap = data.title === "Contact";
  var props = {
    position: [50.597838, 5.411662],
    zoom: 11,
    markerText: "Oality"
  }
  return (
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
    {hasMap ? (
      <Map center={props.position} zoom={props.zoom}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnN1dHRvciIsImEiOiJjazU1ZDNoZWMwMWt0M2VrbWs0YWMybTNlIn0.Ddwglcc3rPCcYzelZzLAyQ"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <Marker position={props.position}>
            <Popup>{props.markerText}</Popup>
          </Marker>
        </Map>

    ) : null}
  </article>
  </Jumbotron>
);
};

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
