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