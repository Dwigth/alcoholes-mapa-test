import { useEffect, useState } from 'react'
import styled from 'styled-components'
import defaultPlaceholder from "./assets/default-placeholder.png"
import Map from './Map';
import './App.css'
import { Rula } from './rula';
import { ZOOM_LEVEL } from './constants';

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



const DefaultPlaceholderImage = styled.img`
width: 100%;
height: 90%;
border: 2px solid black;
margin-bottom: 10px;
`;

function App() {
  const { search } = window.location;
  const rula = new Rula(search);

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
            <Map coordinates={rula.coordinates} zoomLevel={ZOOM_LEVEL}></Map>
          </div>


        </Row>
      </Container>
    </>
  )
}

export default App
