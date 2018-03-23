(function ($) {
	"use strict";

	$.fn.carrerasForm = function () {
		return this.each(function () {

			var $form_wrapper = $(this),
				$form1 = $(this).find('.form--step1 form'),
				$form2 = $(this).find('.form--step2 form');

			function init() {
				$.validate({
					form: $form_wrapper.find('form'),
					errorMessageClass: "error",
					scrollToTopOnError: false,
					validateHiddenInputs: true,
					onSuccess: function () {
						$('.form-submit-error__step4 .help-block').fadeOut("fast");
					},
					onError: function () {
						$('.form-submit-error__step4 .help-block').fadeIn("fast");
					},
				});
			}

			var table = $('#myTable').DataTable({
				autoWidth: true,
				scrollCollapse: true,
				"paging": false,
				fixedHeader: true,
				buttons: [
					'selectAll',
					'selectNone'
				],
				"language": {
					"zeroRecords": "No se encontraro coincidencias",
					"search": "Buscar:",
					"infoFiltered": "(filtrado de _MAX_ competidores)",
					"infoEmpty": "Mostrando 0 a 0 de 0 competidores",
					"info": "Mostrando _TOTAL_ competidores",
				}
			});

			function countRow() {
				var counts = table.rows('.selected').data().length + ' Competidores Seleccionados';
				return counts;
			}

			$('#myTable_wrapper .row:eq(0) .col-md-6:eq(0)').html('<a id="select-all" class="btn btn-secondary">Seleccionar Todos</a><a id="deselect-all" class="btn btn-secondary">Deseleccionar Todos</a>');

			$('#myTable_wrapper .row:eq(2) .col-md-7').html('<div class="selected-count"></div>');

			$('.selected-count').text(countRow());

			$('#myTable tbody').on('click', 'tr', function () {
				$(this).toggleClass('selected');
				$('.selected-count').text(countRow());
			});

			$("#select-all").click(function () {
				$("#myTable tbody tr").addClass('selected');
				$('.selected-count').text(countRow());
			});

			$("#deselect-all").click(function () {
				$("#myTable tbody tr").removeClass('selected');
				$('.selected-count').text(countRow());
			});


			//init();

			function dataCompetidores(){
			var array = [];
				var rowsBody= $("#myTable").find('tbody > tr ');

				for (var i = 0; i < rowsBody.length; i++) {

					if(($('#myTable tbody tr').eq(i).hasClass('selected'))){

						var numComp = $('#myTable tbody tr').eq(i).children('th').text();
						
						array.push(numComp);
					}
	
				}
				return array;
			}



			function dataForm() {
				var numCompe = dataCompetidores();
				var formData = {
					nombre: $("#inputNombreCompetencia").val(),
					fecha: $("#inputFecha").val(),
					hora: $("#inputHora").val(),
					categoria: $("#inputCategoria").val(),
					competidores: numCompe
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
				//console.log(arrayComeptidores);

				//alert("Carrera Guardada");

				//location.href = "/carreras";
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

	});

}(jQuery));
