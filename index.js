/**
 * @description Se debe obtener la información através de los parametros GET.
 * @example rfc=&licenciatario=&licencia=&domicilio=&rula=
 * 
 * RFC
 * nombre licenciatario
 * licencia
 * domicilio:{municipio}{localidad}{colonia}
 * 
 * @17.984515,-92.9327628,
 * rula: 01545REMP-(-45.4554744,95.65595949) -OTROCODIGO
 * 01545REOMPIP4545547449565595949OfpTROCODIGO
 * 
 * @param rawParams {string} Obtiene los parametros enviados atraves de la url.
 * @param coord     {array}  Tupla que contiene la latitud y la longitud. [lat,long].
 * @param obj       {Object} Objeto que contiene los datos de rawParams en formato clave-valor.
 */
class RULA {
    constructor() {
        this.coord = [0, 0];
        this.obj = new Map();
        this.rawParams = window.location.search.substr(1);
        if (this.rawParams.length == 0) {
            alert('No se han encontrado parametros en la URL.');
            return;
        }
        this.FormatParams();
        this.DrawTable();
        this.GetLatLong();
        // this.DrawMap();
    }

    GetLatLong() {
        // code
    }

    FormatParams() {
        const formatArr = this.rawParams.split('&');
        formatArr.forEach(param => {
            const result = param.split('=');
            this.obj.set(result[0], result[1]);
        });
    }

    DrawTable() {
        const trValues = document.querySelector('#result-data');
        this.obj.forEach((val) => {
            const td = document.createElement('td');
            td.textContent = val;
            trValues.appendChild(td);
        });
    }

    DrawMap() {
        const cm = new CustomMap();
        cm.Draw(this.coord);
    }
}

class CustomMap {
    Draw(coord) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHdpZ3RoIiwiYSI6ImNraG50c2VzMzF2bXQyd3BoZW50Z25ocTYifQ.rR--pjoiumjCFi0i7wRsYQ';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coord[1], coord[0]],
            zoom: 8
        });

        const marker = new mapboxgl.Marker()
            .setLngLat([coord[1], coord[0]])
            .addTo(map);
    }
}

new RULA();