//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////INICIAR CARRERAS/////////////////////////////////////////////////////////////////////


var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
function inicio(){
	control = setInterval(cronometro,10);
	document.getElementById("parar1").disabled = false;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio1").disabled = false;
}
function parar(){
	console.log("entro");
	clearInterval(control);
	document.getElementById("parar1").disabled = true;
	document.getElementById("continuar").disabled = false;
}
function reinicio(){
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
	document.getElementById("parar1").disabled = true;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio1").disabled = true;
}
function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}
}
var w=0;
var ban=0;

function mostrar(){ban=1;}

		
function info(elEvento) {
         var evento = elEvento || window.event // definir objeto event
         if (evento.type ==  "keypress" && evento.keyCode==13 && ban==1) { //el número de caracter sólo está en el evento keypress
         	if(w==0){inicio();}
            $('#addr'+w).html("</td><td class='text-center' id='campo"+w+"'>"+horas+':'+minutos+':'+segundos+':'+centesimas+"</td><td ><input  id='num"+w+"'  placeholder='Numero' ></td></td>");
			$('#tab_logic').append('<tr id="addr'+(w+1)+'"></tr>');

      		w++; 
            } 

             if (evento.type ==  "keypress" && evento.keyCode==115 ) {
              if(w>1){
				 $("#addr"+(w-1)).html('');
				 w--;
				 }
             }

} 


 var Nom,lug,fec,hor, seleccion=1,idC;

function convertir_tiempo(v){
 	var variable_float=0, cont=0;
	for (var i = v.split(":").length - 1; i>=0; i--) {
		if (i < v.split(":").length - 1) {
			variable_float = variable_float + (Math.pow(60,cont - 1) * parseFloat(v.split(":")[i]));
		}
		cont++;
	}
  return variable_float + parseFloat(v.split(":")[v.split(":").length - 1])/100;
}

$('#Guardar1').click(function(){
    	var data = {
    		id_competencia : parseInt(idC),
    		tiempos : [] 
    	}

    	for(var e=1; e<w;e++){
			var campo2="campo"+e;
			var num2="num"+e;
			data.tiempos.push({numero_atleta : parseInt(document.getElementById(num2).value) , tiempo : convertir_tiempo(document.getElementById(campo2).innerText)})
		}
		/*$.post("/competencia/agregar-tiempos", data, (informacion, estado) =>{
        	alert("Información: " + informacion + "\nEstado: " + estado);
    	});*/
        $.ajax({
                url : '/competencia/agregar-tiempos',
                data : JSON.stringify(data), 
                method : 'post', //en este caso
                contentType: 'application/json',
                success : function(response){
                        alert("Competencia Guardada");
                        location.href = "/historial";
                },
                error: function(error){
                      console.log(error);
                }
        });
});


window.onload = function() { //acceso a los eventos.
document.onkeypress = info;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var table = $('#Tablecompe').DataTable({
 scrollCollapse: true,
 
 "language": 
 {
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sSearch":         "Buscar:",
    "oAria": {
        
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
 },
     "bPaginate": false,
      "bInfo": false  
   
});

 
 $('#Tablecompe tbody').on('click', 'tr', function () {
      $(this).toggleClass('selected');  
      Nom= $('.selected').children('.nombreCompetencia').text();
      lug= $('.selected').children('.lugarCompetencia').text();
      fec= $('.selected').children('.fechaCompetencia').text();
      hor= $('.selected').children('.horaCompetencia').text();
      idC= $('.selected').children('.idCompetencia').text();
      $('#nom1').attr("value", "Nombre: "+Nom);
      $('#lugar').attr("value", "Lugar: "+lug);
      $('#fecha').attr("value", "Fecha: "+fec);
      $('#hora').attr("value", "Hora: "+hor);
      $('#id_competencia').attr("value", idC);
     
 });
   
$('#btn-ini').click(function(){
   $("#Tablecompe tbody tr").removeClass('selected');
   document.getElementById("compe").disabled = true;
});

$('#cancelarC').click(function(){
   $("#Tablecompe tbody tr").removeClass('selected');
   $('#nom1').attr("value", "Nombre: ");
   $('#lugar').attr("value", "Lugar: ");
   $('#fecha').attr("value", "Fecha: ");
   $('#hora').attr("value", "Hora: ");
 
});

$('#closeC').click(function(){
   $("#Tablecompe tbody tr").removeClass('selected');
   $('#nom1').attr("value", "Nombre: ");
   $('#lugar').attr("value", "Lugar: ");
   $('#fecha').attr("value", "Fecha: ");
   $('#hora').attr("value", "Hora: ");
 
});
