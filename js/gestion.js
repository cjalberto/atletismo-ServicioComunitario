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