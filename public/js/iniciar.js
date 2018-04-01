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
var i=0;
var ban=0;

function mostrar(){ban=1;}

		
function info(elEvento) {
         var evento = elEvento || window.event // definir objeto event
         if (evento.type ==  "keypress" && evento.keyCode==13 && ban==1) { //el número de caracter sólo está en el evento keypress
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
   	var counts = table.rows('.selected').data().length;
   	
      $(this).toggleClass('selected');  
      var nomCompe= $('.selected').children('.nombreCompetencia').text();
   
   
 
   });
   