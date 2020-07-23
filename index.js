window.onload = start;

var formConvalidaciones;
var refConvalidaciones;
var tbodyTablaConvalidaciones;

function start() {

    tbodyTablaConvalidaciones = document.getElementById('cuerpo');

    refConvalidaciones = firebase.database().ref().child('Posts');

    mostrarConvalidacionesDeFirebase();
}

function mostrarConvalidacionesDeFirebase() {
    refConvalidaciones.on('value', function (snap) {
        var datos = snap.val();
        var filasAmostrar = "";
        for (var key in datos) {
            filasAmostrar += '<br><br><br>' +
                '<div class="row">' +
                    '<div class="col-lg-8">' +
                        '<div class="form-group">' +
                            '<div class="text-right">' +
                                '<h2 class="nav-link active white">' + datos[key].title + '</h2>' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<div class="row">' +
                                '<div class="col-lg-5">' +
                                    '<div class="text-left">' +
                                        '<h4>' + datos[key].description +'</h4>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-3">' +
                                    '<img src="' + datos[key].image + '"width="300" alt="Imagen sobre el problema">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-lg-4">' +
                        '<div class="card">' +
                            '<div class="card-body">' +
                                '<div class="form-group">' +
                                    '<div class="text-left">' +
                                        '<h5>' + datos[key].username+'</h5>' +
                                    '</div>' +
                                    '<img class="text-right"src="' + datos[key].photo + '"width="100">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
        }
        tbodyTablaConvalidaciones.innerHTML = filasAmostrar;
    });
}

function enviarConvalidacionAFirebase() {
    //alert('hola');
    event.preventDefault();
    refConvalidaciones.push({
        cicloAconvalidar: event.target.cicloAconvalidar.value,
        cicloAportado: event.target.cicloAportado.value,
        moduloAconvalidar: event.target.moduloAconvalidar.value,
        moduloAportado: event.target.moduloAportado.value
    });
    formConvalidaciones.reset();
}
function cargarPublicaciones(titulo, descripcion, imagen, autor, foto) {
    return '<div class="row"><div class="col-lg-8"><div class="form-group"><div class="text-right"><h2 class="nav-link active white">' +
        titulo + '</h2></div></div><div class="form-group"><div class="row"><div class="col-lg-5"><div class="text-left"><h4>' +
        descripcion + '</h4></div></div><div class="col-lg-3"><img src="' + imagen + '"width="400" alt="Imagen sobre el problema"></div></div>' +
        '</div></div><div class="col-lg-4"><div class="card"><div class="card-body"><div class="form-group"><div class="text-left"><h5>' +
        autor + '</h5></div><img class="text-right"src="' + foto + '"width="200"></div><div id="editData"></div></div></div></div></div>'
}


