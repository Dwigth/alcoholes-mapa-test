import styled from "styled-components";
import googleMapsIcon from "./assets/google-maps-icon.png"
import { useEffect, useState } from "react";
import { IFrameConfiguration } from "./types";
import { googleMapIframeSource, googleMapUrl } from "./google-maps-urls";

const Map = styled.div`
width: 100%;
margin: 0 auto;
margin-bottom: 30px;
`;

const GoogleMapIcon = styled.img`
width: 70px; 
height:70px;
`;

const MapHyperlink = styled.a`
color: #007bff;
text-decoration: none;
background-color: transparent;
`;

const GoogleMapIframe = styled.iframe`
width: 100%;
height: 500px;
border: 2px solid black;
`;

function GoogleMap(props: IFrameConfiguration) {
    const [url, setUrl] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');


    useEffect(() => {
        setUrl(googleMapUrl(props));
        setIframeSrc(googleMapIframeSource(props));
    }, [props])


    return (
        <>
            <Map className="twelve columns">
                <MapHyperlink href={url}>
                    <GoogleMapIcon src={googleMapsIcon} alt="icono de google maps" />
                </MapHyperlink>
                <GoogleMapIframe src={iframeSrc}></ GoogleMapIframe>
            </Map>
        </>
    )
}

export default GoogleMap;