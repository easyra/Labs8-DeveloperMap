import React from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import NavBar from '../NavBar/NavBarView';
import styled from 'styled-components';

const MapWindow = styled.div`
   input{
     height: 30px;
     width: 200px;  
     border-radius: 20px;
     border: none;
     padding-left: 5px;
     &:focus {
       outline: none;
     }
   }
   .mapboxgl-control-container{
     width: 100%;

     .mapboxgl-ctrl-top-right{
      margin-left: 5%;
      margin-top: 6px;
      right: initial;
      top: initial;
      left: initial;
    }
   }
   
`;

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';
mapboxgl.accessToken = MAPBOX_TOKEN;

class LandingPage extends React.Component {
  state={
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/lndubose/cjo6br6c61dfs2snxq0bxlg3f',
    });
    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
  }));
  }

  componentWillUnmount() {
    this.map.remove();
  }
  

  resize() {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  onViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  };
  
  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
    };
    
    return (    
      <MapWindow>
        <div style={style} {...this.state.viewport} onViewportChange={this.onViewportChange} mapboxApiAccessToken={MAPBOX_TOKEN} ref={el => (this.mapContainer = el)} />
        <NavBar resize={this.resize} onViewportChange={this.onViewportChange} viewport={this.state.viewport} {...this.props} mapRef={this.map} mapboxApiAccessToken={MAPBOX_TOKEN}/>
      </MapWindow>        
    );
  }
}

export default LandingPage;
