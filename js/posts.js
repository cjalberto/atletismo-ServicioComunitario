//POST ADD CLUB//

// Attach a submit handler to the form
$( "#crearClub" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
  console.log('crearClub Click');
 
  // Get some values from elements on the page:
  var $form = $( this ),
  datos = {}
	datos.nombre = $form.find( "input[name='nombre']" ).val(),
	datos.descripcion = $form.find( "input[name='descripcion']" ).val(),
	urlpost = $form.attr( "action" );
 
	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
	    contentType: 'application/json',
	    url: urlpost,						
	    success: function(data) {
	        console.log(JSON.stringify(data));
	        if(data.mensaje=='acept'){
	        	alert("Club "+datos.nombre+" Creado");
	        	location.href = "/gestionar/club";
	        }else{
	        	alert("ERROR");
	        }
	    }

	});

});

//POST EDIT CLUB//

// Attach a submit handler to the form
$( "#editClub" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
  console.log('editClub Click');
 
  // Get some values from elements on the page:
  var $form = $( this ),
  datos = {}
	datos.nombre = $form.find( "input[name='nombre']" ).val(),
	datos.descripcion = $form.find( "input[name='descripcion']" ).val(),
	urlpost = $form.attr( "action" );
 
	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
	    contentType: 'application/json',
	    url: urlpost,						
	    success: function(data) {
	        console.log(JSON.stringify(data));
	        if(data.mensaje=='acept'){
	        	alert("Club "+datos.nombre+" Modificado");
	        	location.href = "/gestionar/club";
	        }else{
	        	alert("ERROR");
	        }
	    }

	});

});

//POST ADD CATEGORIA//

// Attach a submit handler to the form
$( "#crearCat" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
  console.log('crearCat Click');
 
  // Get some values from elements on the page:
  var $form = $( this ),
  datos = {}
	datos.nombre = $form.find( "input[name='nombre']" ).val(),
	datos.descripcion = $form.find( "input[name='descripcion']" ).val(),
	datos.sexo = $form.find( "select[name='sexo']" ).val(),
	urlpost = $form.attr( "action" );
 
	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
	    contentType: 'application/json',
	    url: urlpost,						
	    success: function(data) {
	        console.log(JSON.stringify(data));
	        if(data.mensaje=='acept'){
	        	alert("Categoría "+datos.nombre+" Creada");
	        	location.href = "/gestionar/categoria";
	        }else{
	        	alert("ERROR");
	        }
	    }

	});

});

//POST EDIT CATEGORIA//

// Attach a submit handler to the form
$( "#editCat" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
  console.log('editCat Click');
 
  // Get some values from elements on the page:
  var $form = $( this ),
  datos = {}
	datos.nombre = $form.find( "input[name='nombre']" ).val(),
	datos.descripcion = $form.find( "input[name='descripcion']" ).val(),
	datos.sexo = $form.find( "select[name='sexo']" ).val(),
	urlpost = $form.attr( "action" );
 
	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
	    contentType: 'application/json',
	    url: urlpost,						
	    success: function(data) {
	        console.log(JSON.stringify(data));
	        if(data.mensaje=='acept'){
	        	alert("Categoría "+datos.nombre+" Modificada");
	        	location.href = "/gestionar/categoria";
	        }else{
	        	alert("ERROR");
	        }
	    }

	});

});


//POST ADD ATLETA//

// Attach a submit handler to the form
$( "#crearAtleta" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
  // Get some values from elements on the page:
  var $form = $( this ),
  datos = {}
	datos.primer_nombre = $form.find( "input[name='primer_nombre']" ).val(),
	datos.segundo_nombre = $form.find( "input[name='segundo_nombre']" ).val(),
	datos.primer_apellido = $form.find( "input[name='primer_apellido']" ).val(),
	datos.segundo_apellido = $form.find( "input[name='segundo_apellido']" ).val(),
	datos.cedula = $form.find( "input[name='cedula']" ).val(),
	datos.fecha_nacimiento = $form.find( "input[name='fecha_nacimiento']" ).val(),
	datos.id_club = $form.find( "select[name='id_club']" ).val(),
	datos.id_categoria = $form.find( "select[name='id_categoria']" ).val(),
	datos.sexo = $form.find( "select[name='sexo']" ).val(),
	urlpost = $form.attr( "action" );
 
	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
	    contentType: 'application/json',
	    url: urlpost,						
	    success: function(data) {
	        console.log(JSON.stringify(data));
	        if(data.mensaje=='acept'){
	        	alert("El Atleta "+datos.primer_nombre+" Creado");
	        	location.href = "/gestionar/atleta";
	        }else{
	        	alert("ERROR");
	        }
	    }

	});

});