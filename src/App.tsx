import { useState } from 'react'
import styled from 'styled-components'
import googleMapsIcon from "./assets/google-maps-icon.png"
import defaultPlaceholder from "./assets/default-placeholder.png"
import './App.css'

const Container = styled.div`
width: 80% !important;
margin: 0 auto;
marginBottom: 60px;
`;

const Row = styled.div`

`;

const OverflowContainer = styled.div`
overflow-x:auto;
`;

const Table = styled.table`
border-collapse: collapse;
/* margin: 25px 25px; */
border-spacing: 0;
font-size: 0.9em;
/* font-family: sans-serif; */
width: 100%;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
margin-bottom: 50px;
`;

const Map = styled.div`
width:100%; margin: 0 auto;  margin-bottom: 30px;
`;

const GoogleMapIcon = styled.img`
width: 70px; height:70px;
`;

const MapHyperlink = styled.a`

`;

const DefaultPlaceholderImage = styled.img`
width: 100%;
height: 90%;
border: 2px solid black;
margin-bottom: 10px;
`;

function App() {

  return (
    <>
      <Container>
        <h1>Información de Alcoholes</h1>
        <Row>

          <div className="imgcont col-12 col-lg-6">
            <DefaultPlaceholderImage src={defaultPlaceholder} alt="Local" />
          </div>

          <OverflowContainer className="col-12 col-lg-6" >
            <Table aria-describedby="Información" >
              <thead>
                <tr>
                  <th>Datos</th>
                  <th>Valores</th>
                </tr>
              </thead>
              <tbody id="result-data" className="active-row">
              </tbody>
            </Table>
          </OverflowContainer>


          <div className="col-12">


            <Map id="map">
              <a id="gmaps">
                <GoogleMapIcon src={googleMapsIcon} alt="imagen" />
              </a>

            </Map>
          </div>


        </Row>
      </Container>
    </>
  )
}

export default App
