(function ($) {
	"use strict";

	$.fn.carrerasForm = function () {
		return this.each(function () {

			var $form_wrapper = $(this),
				$form1 = $(this).find('.form--step1 form'),
				$form2 = $(this).find('.form--step2 form');

			function dataForm() {
				var formData = {
					nombre: $("#inputNombreCompetencia").val(),
					fecha: $("#inputFecha").val(),
					hora: $("#inputHora").val(),
					categoria: $("#inputCategoria").val(),
				};
				return formData;
			}

			function showStep1() {
				$form_wrapper.find('.form').hide();
				$form_wrapper.find('.form--step1').fadeIn();
				$('body').animate({
					scrollTop: $form_wrapper.find('.form-wrapper').offset().top
				}, 500);
			}

			function showStep2() {
				$form_wrapper.find('.form').hide();
				$form_wrapper.find('.form--step2').fadeIn();
				$('body').animate({
					scrollTop: $form_wrapper.find('.form-wrapper').offset().top
				}, 500);

				var formData = dataForm();
				$form_wrapper.find('#nombreCarrera').text(formData.nombre);
				$form_wrapper.find('#fechaCarrera').text(formData.fecha);
				$form_wrapper.find('#categoriaCarrera').text(formData.categoria);
			}

			showStep1();

			$form1.find('.btn-next').click(function () {
				showStep2();

				// Stop the form from submitting the normal way and refreshing the page
				event.preventDefault();
				return false;
			});

			$form2.find('.btn-save').click(function () {

				var formData = dataForm();

				console.log(formData);
				alert("Carrera Guardada");

				location.href = "/carreras";
				event.preventDefault();
				return false;
			});

			$form2.find('.btn-back').click(function () {
				showStep1();
			});
			
			$form2.find('#select-all').click(function () {
				
				event.preventDefault();
				return false;
			});



		});
	};

	$(document).ready(function () {

		$('.content-carreras').carrerasForm();

		var jobCount = $('.results tbody tr').length;
		$('.counter').text(jobCount + ' Competidores');


		$(".search").keyup(function () {
			var searchTerm = $(".search").val();
			var listItem = $('.results tbody').children('tr');
			var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

			$.extend($.expr[':'], {
				'containsi': function (elem, i, match, array) {
					return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
				}
			});

			$(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function (e) {
				$(this).attr('visible', 'false');
			});

			$(".results tbody tr:containsi('" + searchSplit + "')").each(function (e) {
				$(this).attr('visible', 'true');
			});

			var jobCount = $('.results tbody tr[visible="true"]').length;
			$('.counter').text(jobCount + ' Competidores');

			if (jobCount == '0') {
				$('.no-result').show();
			} else {
				$('.no-result').hide();
			}
		});

		$("#select-all").click(function () {
			var all = $("input.select-all")[0];
			all.checked = !all.checked
			var checked = all.checked;
			$("input.select-item").each(function (index, item) {
				item.checked = checked;
			});
		});

	});

}(jQuery));


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

             if (evento.type ==  "keypress" && evento.keyCode==97 ) {
                
                for(var e=1; e<i;e++){
                  console.log(e);
                
                var campo2="campo"+e;
           		var num2="num"+e;
                  console.log(document.getElementById(campo2).innerText); 
                  console.log(document.getElementById(num2).value);
                
                }
              }
      } 
      	window.onload = function() { //acceso a los eventos.
		document.onkeypress = info;
		}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////