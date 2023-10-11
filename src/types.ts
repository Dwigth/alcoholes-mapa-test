export type Coordinates = {
    latitude: number;
    longitude: number;
}

export type IFrameConfiguration = {
    coordinates: Coordinates;
    zoomLevel: number;
}

export type LicenseInformation = {
    rfc: string;
    licenseName: string;
    license: string;
    address: string;
    rula: string;
}