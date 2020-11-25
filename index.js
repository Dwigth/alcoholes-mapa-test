/**
 * @description Se debe obtener la información através de los parametros GET.
 * @example rfc=&licenciatario=&licencia=&domicilio=&rula=
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
class RULA {
    constructor() {
        this.coord = [0, 0];
        this.obj = new Map();
        this.rawParams = window.location.search.substr(1);
        var data;
        if (this.rawParams.length == 0) {
            alert('No se han encontrado parametros en la URL.');
            return;
        }

        this.FormatParams();
        this.DrawTable();
        this.GetLatLong();
        this.DrawMap();
        this.Redirect();
    }

    GetLatLong() {
        var rula = this.obj.get("RULA")
        let temp = rula.slice(16, rula.length);
        temp = temp.slice(2, 26);
        let cordenadas = temp.split("LO");
        let latitud = cordenadas[0];
        let longitud = cordenadas[1];

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

        this.coord = [latitud, longitud];
    }

    FormatParams() {
        var str = this.rawParams;
        str = decodeURI(str);
        //const formatArr = this.rawParams.split('&');

        const formatArr = str.split('&');
        formatArr.forEach(param => {
            const result = param.split('=');
            this.obj.set(result[0], result[1]);
        });
    }

    DrawTable() {
        const tbody = document.querySelector('#result-data');
        this.obj.forEach((val, key) => {
            const trVal = document.createElement('tr');
            const tdKey = document.createElement('td');
            const tdVal = document.createElement('td');
            tdKey.textContent = key.toUpperCase();
            tdVal.textContent = val.toUpperCase();
            trVal.append(tdKey, tdVal);
            tbody.appendChild(trVal);
        });
    }

    DrawMap() {
        const mapCont = document.querySelector('#map');
        const iframe = document.createElement('iframe');
        this.url = `https://www.google.com.mx/maps/@${this.coord[0]},${this.coord[1]},19z`;
        iframe.src = `https://maps.google.com/maps?q=${this.coord[0]},${this.coord[1]}&hl=es&z=19&amp&output=embed`;
        mapCont.appendChild(iframe)
    }

    Redirect() {
        const a = document.querySelector('#gmaps');
        a.href = this.url;
    }
}

const app = new RULA();