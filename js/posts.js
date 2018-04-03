//POST ADD COMEPTENCIA _ ATLETA//

// Attach a submit handler to the form
$("#crearCompe").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	console.log('crearCompe Click');

	// Get some values from elements on the page:
	var i;
	var $form = $(this),
		datos = {}
	datos.nombre = $form.find("input[name='nombre']").val(),
		datos.fecha = $form.find("input[name='fecha']").val(),
		datos.hora = $form.find("input[name='hora']").val(),
		datos.lugar = $form.find("input[name='lugar']").val(),
		datos.id_atleta = [],
		datos.num_atleta = [],
		urlpost = $form.attr("action");

	$form.find("input[name='id_atleta']").each(function (i, element) {
		datos['id_atleta'][i] = $(element).val();
	});

	$form.find("input[name='num_atleta']").each(function (i, element) {
		datos['num_atleta'][i] = $(element).val();
	});

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (msg) {
			if (msg.mensaje == 'acept') {
				alert("Competencia " + datos.nombre + " Creada");
				location.href = "/competencia/iniciar";
			} else {
				alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}

	});

});


//POST EDIT COMEPTENCIA _ ATLETA//

// Attach a submit handler to the form
$("#editCompe").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	console.log('editCompe Click');

	// Get some values from elements on the page:
	var i;
	var $form = $(this),
		datos = {}
	datos.id = $form.find("input[name='id']").val(),
		datos.nombre = $form.find("input[name='nombre']").val(),
		datos.fecha = $form.find("input[name='fecha']").val(),
		datos.hora = $form.find("input[name='hora']").val(),
		datos.lugar = $form.find("input[name='lugar']").val(),
		datos.id_atleta = [],
		datos.num_atleta = [],
		urlpost = $form.attr("action");

	$form.find("input[name='id_atleta']").each(function (i, element) {
		datos['id_atleta'][i] = $(element).val();
	});

	$form.find("input[name='num_atleta']").each(function (i, element) {
		datos['num_atleta'][i] = $(element).val();
	});

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (msg) {
			if (msg.mensaje == 'acept') {
				alert("Competencia " + datos.nombre + " Modificada");
				location.href = "/competencia/modificar";
			} else {
				alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}

	});

});




//POST ADD CLUB//

// Attach a submit handler to the form
$("#crearClub").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	console.log('crearClub Click');

	// Get some values from elements on the page:
	var $form = $(this),
		datos = {}
	datos.nombre = $form.find("input[name='nombre']").val(),
		datos.descripcion = $form.find("input[name='descripcion']").val(),
		urlpost = $form.attr("action");

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (msg) {
			if (msg.mensaje == 'acept') {
				alert("Club " + datos.nombre + " Creado");
				location.href = "/gestionar/club";
			} else {
				alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}

	});

});

//POST EDIT CLUB//

// Attach a submit handler to the form
$("#editClub").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	console.log('editClub Click');

	// Get some values from elements on the page:
	var $form = $(this),
		datos = {}
	datos.nombre = $form.find("input[name='nombre']").val(),
		datos.descripcion = $form.find("input[name='descripcion']").val(),
		urlpost = $form.attr("action");

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (msg) {
			if (msg.mensaje == 'acept') {
				alert("Club " + datos.nombre + " Modificado");
				location.href = "/gestionar/club";
			} else {
				alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}

	});

});

//POST ADD CATEGORIA//

// Attach a submit handler to the form
$("#crearCat").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	console.log('crearCat Click');

	// Get some values from elements on the page:
	var $form = $(this),
		datos = {}
	datos.nombre = $form.find("input[name='nombre']").val(),
		datos.descripcion = $form.find("input[name='descripcion']").val(),
		datos.edad_min = $form.find("input[name='edad_min']").val(),
		datos.edad_max = $form.find("input[name='edad_max']").val(),
		urlpost = $form.attr("action");

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (msg) {
			if (msg.mensaje == 'acept') {
				alert("Categoria " + datos.nombre + " Creada");
				location.href = "/gestionar/categoria";
			} else {
				alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}

	});

});

//POST EDIT CATEGORIA//

// Attach a submit handler to the form
$("#editCat").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	console.log('editCat Click');

	// Get some values from elements on the page:
	var $form = $(this),
		datos = {}
	datos.nombre = $form.find("input[name='nombre']").val(),
		datos.descripcion = $form.find("input[name='descripcion']").val(),
		datos.edad_min = $form.find("input[name='edad_min']").val(),
		datos.edad_max = $form.find("input[name='edad_max']").val(),
		urlpost = $form.attr("action");

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (msg) {
			if (msg.mensaje == 'acept') {
				alert("Categoria " + datos.nombre + " Modificada");
				location.href = "/gestionar/categoria";
			} else {
				alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}

	});

});


//POST ADD ATLETA//

// Attach a submit handler to the form
$("#crearAtleta").submit(function (event) {

	// Stop form from submitting normally
	event.preventDefault();
	// Get some values from elements on the page:
	var $form = $(this),
		datos = {}
	datos.primer_nombre = $form.find("input[name='primer_nombre']").val(),
		datos.segundo_nombre = $form.find("input[name='segundo_nombre']").val(),
		datos.primer_apellido = $form.find("input[name='primer_apellido']").val(),
		datos.segundo_apellido = $form.find("input[name='segundo_apellido']").val(),
		datos.cedula = $form.find("input[name='cedula']").val(),
		datos.fecha_nacimiento = $form.find("input[name='fecha_nacimiento']").val(),
		datos.id_club = $form.find("select[name='id_club']").val(),
		datos.sexo = $form.find("select[name='sexo']").val(),
		urlpost = $form.attr("action");

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (data) {
			console.log(JSON.stringify(data));
			if (data.mensaje == 'acept') {
				alert("El Atleta " + datos.primer_nombre + " Creado");
				location.href = "/gestionar/atleta";
			} else {
				alert("ERROR");
			}
		}

	});

});

//POST editAtle ATLETA//

$("#modificarAtle").submit(function (event) {

	event.preventDefault();
	console.log('editAtle Click');

	var $form = $(this),
		datos = {}
	datos.primer_nombre = $form.find("input[name='primer_nombre']").val(),
		datos.segundo_nombre = $form.find("input[name='segundo_nombre']").val(),
		datos.primer_apellido = $form.find("input[name='primer_apellido']").val(),
		datos.segundo_apellido = $form.find("input[name='segundo_apellido']").val(),
		datos.cedula = $form.find("input[name='cedula']").val(),
		datos.fecha_nacimiento = $form.find("input[name='fecha_nacimiento']").val(),
		datos.id_club = $form.find("select[name='id_club']").val(),
		datos.sexo = $form.find("select[name='sexo']").val(),
		urlpost = $form.attr("action");


	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (data) {
			console.log(JSON.stringify(data));
			if (data.mensaje == 'acept') {
				console.log("aceptoooooo");
				alert("Atleta " + datos.primer_nombre + " Modificado");
				location.href = "/gestionar/atleta";
			} else {
				alert("ERROR");
			}
		}
	});

});
