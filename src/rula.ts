import { RULA_STRING_POSITION } from "./constants";
import { Coordinates, LicenseInformation } from "./types";

/**
 * @description Se debe obtener la información através de los parametros GET.
 * @example rfc=&licenciatario=&licencia=&domicilio=&rula=
 * @example ?rfc=IUAA&licenciatario=Micheladas%20El%20Capi&licencia=0000LA2500&domicilio=Manuel%20A.%20Jimenez%20113,%20Centro,%2086800%20Teapa,Tab.&rula=IUAA0000LA2500MSLAP17D549286LOM92D947944EC12345
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
        this.coordinates = this.getCoordinates();
    }

    private getRula(rulaStr: string): string {
        const { initialPosition, start, end } = RULA_STRING_POSITION;
        return (rulaStr.slice(initialPosition, rulaStr.length)).slice(start, end)
    }

    private getCoordinates(): Coordinates {
        const rulaStr = this.uriParameters.get("rula")!
        const rula = this.getRula(rulaStr);
        const coordinates = rula.split("LO");
        let latitude = coordinates[0];
        let longitude = coordinates[1];

        if (longitude.indexOf('EC') != -1) {
            longitude = longitude.replace('EC', '');
        }

        //Formatear 
        longitude.replace('P', '').replace('M', '-').replace('D', '.');
        latitude.replace('P', '').replace('M', '-').replace('D', '.');

        return {
            latitude: Number(latitude),
            longitude: Number(longitude)
        }
    }

    private structureParams() {
        const rawParams = decodeURI(this.rawParams);
        const searchParams = new URLSearchParams(rawParams);

        for (let params of searchParams) {
            const [paramName, paramValue] = params;
            this.uriParameters.set(paramName, paramValue)
        }
    }

    getLicenseData(): LicenseInformation {
        return {
            address: this.uriParameters.get('domicilio')!,
            license: this.uriParameters.get('licencia')!,
            licenseName: this.uriParameters.get('licenciatario')!,
            rfc: this.uriParameters.get('rfc')!,
            rula: this.uriParameters.get('rula')!
        }
    }
}