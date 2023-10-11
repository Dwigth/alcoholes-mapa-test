import { IFrameConfiguration } from "./types";

export const googleMapUrl = ({ coordinates: { latitude, longitude }, zoomLevel }: IFrameConfiguration): string => `https://www.google.com.mx/maps/@${latitude},${longitude},${zoomLevel}z`
export const googleMapIframeSource = ({ coordinates: { latitude, longitude }, zoomLevel }: IFrameConfiguration): string => `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=${zoomLevel}&amp&output=embed`