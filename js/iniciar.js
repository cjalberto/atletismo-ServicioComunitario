//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////INICIAR CARRERAS/////////////////////////////////////////////////////////////////////

var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
function inicio () {
	control = setInterval(cronometro,10);
	document.getElementById("parar").disabled = false;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = false;
}
function parar () {
	clearInterval(control);
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = false;
}
function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = true;
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
var i=0;
           function mostrar() {
				document.getElementById('oculto').style.display = 'block';
				document.getElementById('oculto1').style.display = 'none';
				
				
			}
			
function info(elEvento) {
         var evento = elEvento || window.event // definir objeto event
         if (evento.type ==  "keypress" && evento.keyCode==13 ) { //el número de caracter sólo está en el evento keypress
         	if(i==0){inicio();}
            $('#addr'+i).html("</td><td class='text-center' id='campo"+i+"'>"+horas+':'+minutos+':'+segundos+':'+centesimas+"</td><td ><input  id='num"+i+"'  placeholder='Numero' ></td></td>");
			$('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');

      		i++; 
            } 

             if (evento.type ==  "keypress" && evento.keyCode==115 ) {
              if(i>1){
			   $("#addr"+(i-1)).html('');
				i--;
			   }
             }

} 
function Guardar(){
  for(var e=1; e<i;e++){
var campo2="campo"+e;
var num2="num"+e;
console.log(document.getElementById(campo2).innerText); console.log(document.getElementById(num2).value);
   }
}

window.onload = function() { //acceso a los eventos.
document.onkeypress = info;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
var table = $('#myTable1').DataTable({
	scrollY: "350px",
	scrollCollapse: true,

	"language": 
	{
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
	},
        
			
			});
