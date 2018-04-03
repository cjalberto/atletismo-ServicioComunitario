//////////GestionarTable

var tableGestion = $('#myTableGestion').DataTable({
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


//////////////////////////////Atleta
	
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

var idCompe;
$('#myTable1 tbody').on('click', 'tr', function () {
     $(this).toggleClass('selected');
     idCompe= $('.selected').children('.idAtleta').text();
     
});
 
$('#btn-mod').click(function(){
   $('#modificarAtle').attr("action", "/gestionar/atleta/modificar/"+idCompe);
   $("#myTable1 tbody tr").removeClass('selected');
});
$('#btn-can').click(function(){
   $("#myTable1 tbody tr").removeClass('selected');
});
$('#btn-can1').click(function(){
   $("#myTable1 tbody tr").removeClass('selected');
});
$('#editarS').click(function(){
   $('#modificarAtle1').attr("action", "/gestionar/atleta/modificar/"+idCompe);
});

