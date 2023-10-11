import styled from 'styled-components'
import defaultPlaceholder from "./assets/default-placeholder.png"
import Map from './Map';
import { Rula } from './rula';
import { ZOOM_LEVEL } from './constants';
import BadRequest from './BadRequest';
import LicenseTable from './LicenseTable';

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

const DefaultPlaceholderImage = styled.img`
width: 100%;
height: 90%;
border: 2px solid black;
margin-bottom: 10px;
`;

const AppTitle = styled.h1`
color: #777;
`;

function App() {
  const title = 'Información relacionada a licencias de alcohol';
  const { search } = window.location;
  const rula = new Rula(search);

  return (
    <>
      <Container className='container'>
        <AppTitle>{title}</AppTitle>
        {rula.isValid ? <Row className='row'>

          <div className="six columns">
            <DefaultPlaceholderImage src={defaultPlaceholder} alt="Local" />
          </div>

          <OverflowContainer className="six columns" >
            <LicenseTable licenseData={rula.getLicenseData()} />
          </OverflowContainer>

          <Map coordinates={rula.coordinates} zoomLevel={ZOOM_LEVEL}></Map>


        </Row> : <BadRequest />}
      </Container >
    </>
  )
}

export default App
