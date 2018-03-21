(function ($) {
	"use strict";

	$.fn.carrerasForm = function () {
		return this.each(function () {



			var $form_wrapper = $(this),
				$form1 = $(this).find('.form--step1 form'),
				$form2 = $(this).find('.form--step2 form');

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
			}

			showStep1();

			$form1.find('.btn-next').click(function () {
				showStep2();

				// Stop the form from submitting the normal way and refreshing the page
				event.preventDefault();
				return false;
			});

			$form2.find('.btn-save').click(function () {

				var formData = {
					nombre: $("#inputNombreCompetencia").val(),
					fecha: $("#inputFecha").val(),
					hora: $("#inputHora").val(),
					categoria: $("#inputCategoria").val(),
				};

				console.log(formData);


				// Stop the form from submitting the normal way and refreshing the page
				event.preventDefault();
				return false;
			});

			$form2.find('.btn-back').click(function () {
				showStep1();
			});



		});
	};

	$(document).ready(function () {
		$('.content-carreras').carrerasForm();
	});

}(jQuery));
