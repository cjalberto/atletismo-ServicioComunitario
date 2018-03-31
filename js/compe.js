(function ($) {
	"use strict";

	$.fn.carreras = function () {
		return this.each(function () {

///////////////////CREAR///////////////////////////////////

			var table = $('#myTable').DataTable({
				scrollY: "200px",
				scrollCollapse: true,
				scrollX: true,
				paging: false,
				language: {
					zeroRecords: "No se encontraron coincidencias",
					search: "Buscar:",
					infoFiltered: "(filtrado de _MAX_ competidores)",
					infoEmpty: "Mostrando 0 competidores",
					info: "Mostrando _TOTAL_ competidores",
				}
			});

			function countRow() {
				var counts = table.rows('.selected').data().length + ' Competidores Seleccionados';
				inputsCompetidores();
				buttonSave(table.rows('.selected').data().length);
				return counts;
			}

			function buttonSave(counts){
				if(counts<2){
					$(".btn-save").prop('disabled', true);
				}else{
					$(".btn-save").prop('disabled', false);
				}	
			}

			function inputsCompetidores(){
				$('#inputs').html('');
				for(i=0;i<$('.selected').children('.idCompetidor').length; i++){
					var idCompe= $('.selected').children('.idCompetidor').text()[i];
					$('#inputs').append('<input type="hidden" name="id_atleta" value='+idCompe+'>')
				}
			}

			$('#myTable_wrapper .row:eq(0) .col-md-6:eq(0)').html('<a id="select-all" class="btn btn-secondary">Seleccionar Todos</a><a id="deselect-all" class="btn btn-secondary">Deseleccionar Todos</a>');

			$('#myTable_wrapper .row:eq(2) .col-md-7').html('<div class="selected-count"></div>');

			$('.selected-count').text(countRow());

			$('#myTable tbody').on('click', 'tr', function () {
				$(this).toggleClass('selected');
				$(this).children('#idCompetidor').attr("value", "<%= datosCompetidores[i]['id'] %>");
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

			$('.btn-save').click(function() {		
					alert("Competencia Guardada")	
			});

////////////////////////MODIFICAR-COMETENCIA

			var tableCompe = $('#myTableCompe').DataTable({
				scrollY: "200px",
				scrollCollapse: true,
				scrollX: true,
				paging: false,
				searching: true,
				info: false,
				language: {
					zeroRecords: "No se encontraron coincidencias",
					search: "Buscar:",
					infoFiltered: "(filtrado de _MAX_ resultados)",
					infoEmpty: "Mostrando 0 resultados",
					info: "Mostrando _TOTAL_ resultados",
				}
			});

		});
	};

	$(document).ready(function () {

		$('.content-carreras').carreras();

	});

}(jQuery));