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
