let map, directionsService, directionsRenderer;

function cargarmapa() {
    const punto = new google.maps.LatLng(40.0964469909668, -4.12019157409668);
    // Creación del punto de coordenadas
    const opciones = {
        zoom: 14,
        center: punto,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Creación del mapa
    map = new google.maps.Map(document.getElementById("mapa"), opciones);

    // Inicializar el servicio de direcciones
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Crear el marcador
    const marker = new google.maps.Marker({
        position: punto,
        map: map,
        title: "Mi marca"
    });

    // Añadir evento de clic al marcador
    marker.addListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    calculateAndDisplayRoute(userLocation, punto);
                },
                () => {
                    handleLocationError(true, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, map.getCenter());
        }
    });
}

function calculateAndDisplayRoute(userLocation, businessLocation) {
    directionsService.route(
        {
            origin: userLocation,
            destination: businessLocation,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}

function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        position: pos,
        content: browserHasGeolocation
            ? 'Error: El servicio de geolocalización falló.'
            : 'Error: Tu navegador no soporta geolocalización.',
    });
    infoWindow.open(map);
}

// Exponer la función cargarmapa al objeto window
window.cargarmapa = cargarmapa;
