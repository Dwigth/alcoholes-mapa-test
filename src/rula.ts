import { RULA_STRING_POSITION } from "./constants";
import { Coordinates } from "./types";

/**
 * @description Se debe obtener la información através de los parametros GET.
 * @example rfc=&licenciatario=&licencia=&domicilio=&rula=
 * @example ?rfc=asdadasdad&licenciatario=Hola&licencia=sdgdgfsdfg&domicilio=17.549286,-92.947944&RULA=IUAA0000LA2500MSLAP17D549286LOM92D947944EC12345
 * 
 * RFC
 * nombre licenciatario
 * licencia
 * domicilio:{municipio}{localidad}{colonia}
 * 
 * @17.549286, -92.947944
 * 
 * rula: 4 Primeros Digitos RFC - Licencia  10 Caracteres - Giro (2Letras) - LATITUD - LONGITUD
                                                                EXMPLE:	LA P 17 D 549286  LO M 92 D 947944 EC = 17.549286, -92.947944
 * IUAA0000LA2500MSLAP17D549286LOM92D947944EC12345
 * 
 * @param rawParams {string} Obtiene los parametros enviados atraves de la url.
 * @param coord     {array}  Tupla que contiene la latitud y la longitud. [lat,long].
 * @param obj       {Object} Objeto que contiene los datos de rawParams en formato clave-valor.
 * @param url       {string} Cadena con que contiene la url de Google Maps de la ubicación en la RULA.
 */
export class Rula {
    coordinates: Coordinates = {
        latitude: 0,
        longitude: 0
    };
    isValid: boolean = false;

    private uriParameters = new Map<string, string>();
    private rawParams: string = '';

    constructor(search: string) {
        this.rawParams = search.substring(1);
        if (this.rawParams.length == 0) {
            return;
        }
        this.isValid = true;

        this.structureParams();
        this.getLatLong();
    }

    private getRula(rulaStr: string): string {
        const { initialPosition, start, end } = RULA_STRING_POSITION;
        return (rulaStr.slice(initialPosition, rulaStr.length)).slice(start, end)
    }

    private getLatLong() {
        const rulaStr = this.uriParameters.get("RULA")!
        const rula = this.getRula(rulaStr);
        const coordenadas = rula.split("LO");
        let latitud = coordenadas[0];
        let longitud = coordenadas[1];

        if (longitud.indexOf('EC') != -1) {
            longitud = longitud.replace('EC', '');
        }

        //Formatear 
        longitud = longitud.replace('P', '');
        longitud = longitud.replace('M', '-');
        longitud = longitud.replace('D', '.');

        latitud = latitud.replace('P', '');
        latitud = latitud.replace('M', '-');
        latitud = latitud.replace('D', '.');

        this.coordinates = {
            latitude: Number(latitud),
            longitude: Number(longitud)
        }

        return this.coordinates;
    }

    private structureParams() {
        const rawParams = decodeURI(this.rawParams);
        const searchParams = new URLSearchParams(rawParams);

        for (let params of searchParams) {
            const [paramName, paramValue] = params;
            this.uriParameters.set(paramName, paramValue)
        }
    }
}