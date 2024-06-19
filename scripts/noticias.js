$(document).ready(function () {
    var indiceNoticia = 0;

    // Realizar solicitud HTTP para obtener el archivo JSON de noticias
    $.getJSON('./scripts/noticias.json', function (data) {
        mostrarNoticia(data, indiceNoticia);
        mostrarPuntos(data.length); // Llamar a mostrarPuntos con la cantidad de noticias
        $('.punto').eq(0).addClass('activo'); // Agregar clase activo al primer punto

        $('#anterior').click(function () {
            if (indiceNoticia > 0) {
                indiceNoticia--;
                mostrarNoticia(data, indiceNoticia);
            }
        });

        $('#siguiente').click(function () {
            if (indiceNoticia < data.length - 1) {
                indiceNoticia++;
                mostrarNoticia(data, indiceNoticia);
            }
        });

        $('.punto').click(function () {
            var index = $(this).index();
            indiceNoticia = index;
            mostrarNoticia(data, indiceNoticia);
        });
    }).fail(function () {
        console.error("Error al cargar el archivo JSON");
    });
});

function mostrarNoticia(data, indice) {
    $('.noticia').hide();
    $('#noticias').html('<h3>' + data[indice].titulo + '</h3>' + '<p>' + data[indice].contenido + '</p>');
    $('.punto').removeClass('activo');
    $('.punto').eq(indice).addClass('activo');
}

function mostrarPuntos(cantidadNoticias) {
    var $barraPuntos = $('#barra_puntos');
    $barraPuntos.empty(); // Vaciar la barra de puntos antes de agregar nuevos puntos
    for (var i = 0; i < cantidadNoticias; i++) {
        var $punto = $('<span class="punto"></span>');
        $barraPuntos.append($punto);
    }
}

