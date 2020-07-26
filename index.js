window.onload = start;

var formConvalidaciones;
var refConvalidaciones;
var refComentarios;
var tbodyTablaConvalidaciones;
var detalle;

function start() {

    tbodyTablaConvalidaciones = document.getElementById('post');

    refConvalidaciones = firebase.database().ref().child('Posts');


    mostrarConvalidacionesDeFirebase();
}
function addComments(key1) {


    refConvalidaciones.on('value', function (snap) {
        var data = snap.val();

        var comentarios = data[key1].comments;

        var comentariosAmostrar = "";
        for (var key in comentarios) {
            comentariosAmostrar += '<div class="text-content">' +
                '<div class="row">' +

                '<div class="col-md-1 text-left">' +
                '<img src="' + comentarios[key].photo + '" alt="Cargando..." style="width:30px;height:30px;">' +
                '</div>' +
                '<div class="col-md-11 text-left">' +
                '<h4>' + comentarios[key].username + '</h4>' +

                '</div>' +
                '</div>' +
                '<p>' + comentarios[key].description + '</p>' +


                '</div>'
        }

        detalle.innerHTML += comentariosAmostrar;
    });
}
function mostrarDetalle(foto, imagen, titulo, user, fecha, likes, descripcion, key) {
    detalle = document.getElementById('first-tab-group');
    detalles = '<div>' +
        '<img src="' + imagen + '" alt="Cargando...">' +
        '<div class="text-content">' +
        '<h4>' + titulo + '</h4>' +
        '<ul class="info-post">' +
        '<li><img src="' + foto + '" alt="Cargando..." style="width:30px;height:30px;"> &nbsp; ' + user + '</li>' +
        '<li><i class="fa fa-calendar"></i>' + fecha + '</li>' +
        '<li><i class="fa fa-thumbs-up"></i>' + likes + '</li>' +
        '</ul>' +
        '<p>' + descripcion + '</p>' +
        '</div>' +
        '</div>';
    detalle.innerHTML = detalles;
    addComments(key);


}

function mostrarConvalidacionesDeFirebase() {
    refConvalidaciones.on('value', function (snap) {
        var datos = snap.val();
        var filasAmostrar = "";
        for (var key in datos) {
            var args = "'" + datos[key].photo + "','" + datos[key].image + "','" + datos[key].title + "','" + datos[key].username +
                "','" + datos[key].date + "','" + datos[key].likes + "','" + datos[key].description + "','" + key + "'";
            var cm = '"';
            filasAmostrar += '<li><a class="active">' +
                datos[key].title +
                '<ul class="info-post">' +
                '<li><i class="fa fa-user"> </i>' + datos[key].username + '</li>' +
                '<li><i class="fa fa-calendar"></i>' + datos[key].date + '</li>' +
                '<li><i class="fa fa-thumbs-up"></i>' + datos[key].likes + '</li>' +
                '</ul >' +
                "<button class='btn btn-primary btn-lg' onclick=" + cm + "return mostrarDetalle(" + args + ");" + cm + ">Detalles</button>" +
                '</a ></li >'
        }

        tbodyTablaConvalidaciones.innerHTML = filasAmostrar;
    });
}
