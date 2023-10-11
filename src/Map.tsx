import styled from "styled-components";
import googleMapsIcon from "./assets/google-maps-icon.png"
import { useEffect, useState } from "react";
import { Coordinates, IFrameConfiguration } from "./types";
import { googleMapIframeSource, googleMapUrl } from "./google-maps-urls";

const Map = styled.div`
width:100%; margin: 0 auto;
margin-bottom: 30px;
`;

const GoogleMapIcon = styled.img`
width: 70px; 
height:70px;
`;

const MapHyperlink = styled.a``;

const GoogleMapIframe = styled.iframe`

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
            <Map>
                <GoogleMapIframe src={iframeSrc}></ GoogleMapIframe>
                <MapHyperlink href={url}>
                    <GoogleMapIcon src={googleMapsIcon} alt="imagen" />
                </MapHyperlink>
            </Map>
        </>
    )
}

export default GoogleMap;