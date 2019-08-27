if (typeof jQuery != "undefined") jQuery(function ($) {
	var dadataToken = window.dadataToken || '';
	if ($.validator) {
		$.validator.addMethod('mobile', function (value, element) {
			return this.optional(element) || /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(value);
		}, 'Введите номер мобильного телефона в формате +7(***) ***-**-**');
		$.validator.addMethod('current_email', function (value, element) {
			return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
		}, 'Введите корректный адрес электронной почты');
	}
	var $sf2forms = $('form.simpleForm2');
	var sf2Improvements = function () {
		var SF2Config = window.SF2Config || {};
		var authName = window.user && window.user.name || '';
		var authEmail = window.user && window.user.email || '';
		$sf2forms.each(function () {
			var id = this.id;
			var $form = $(this);
			if (id in SF2Config) {
				if (SF2Config[id].ajaxURI.indexOf('?') < 0) {
					SF2Config[id].ajaxURI += '?' + Date.now() + Math.floor(Math.random() * 1000);
				}
				$form.on('submit', function () {
					var uri = SF2Config[id].ajaxURI.substr(0, SF2Config[id].ajaxURI.indexOf('?'));
					SF2Config[id].ajaxURI = uri + '?' + Date.now();
				});
				var $cityInput = $form.find('input[name=city]'),
					$nameInput = $form.find('input[name=name]'),
					$emailInput = $form.find('input[name=email]');
				if (authName) {
					$nameInput.val(authName).addClass('uk-disabled');
				}
				if (authEmail) {
					$emailInput.val(authEmail).addClass('uk-disabled');
				}
				if ($form.suggestions) {
					[$cityInput, $nameInput, $emailInput].forEach(function ($input) {
						if ($input.length === 0 || $input.hasClass('uk-disabled')) return;
						var suggestionType = 'ADDRESS';
						if ($input === $nameInput) {
							suggestionType = 'NAME';
						} else if ($input === $emailInput) {
							suggestionType = 'EMAIL';
						}
						$input.suggestions({
							addon: 'none',
							count: 5,
							type: suggestionType,
							scrollOnFocus: false,
							token: dadataToken
						});
					});
				}
				if ($form.validate) {
					$form.validate({
						errorClass: 'uk-form-danger',
						errorElement: 'div',
						validClass: 'tm-form-success',
						rules: {
							name: {
								minlength: 4,
							},
							email: {
								current_email: true,
							},
							phone: {
								mobile: true,
								minlength: 11,
							},
						},
					});
					var originalOnBeforeSend = SF2Config[id].onBeforeSend;
					SF2Config[id].onBeforeSend = function ($form) {
						$form.valid();
						if ($form.validate().numberOfInvalids() != 0) {
							return false;
						}
						return originalOnBeforeSend($form);
					}
				}
				if ($form.find('.jsRequestQualification').length > 0) {
					var initFormData = {
						'ajaxURI': SF2Config[id].ajaxURI,
						'onAfterReceive': SF2Config[id].onAfterReceive,
						'onBeforeSend': SF2Config[id].onBeforeSend
					}
					$form.on('change', '.jsRequestQualification', function () {
						var moduleId = $form.find('[name=moduleID]').val();
						var val = $(this).val();
						if (val && val !== moduleId) {
							var key = 'simpleForm2_' + val;
							$form.attr('name', key).find('input[name=moduleID]').attr('value', val);
							if (!(key in SF2Config)) {
								initFormData.ajaxURI = initFormData.ajaxURI.substr(0, initFormData.ajaxURI.indexOf('?')) + '?' + Date.now();
								SF2Config[key] = initFormData;
							}
						}
					});
				}
				var $toggledFields = $form.find('.jsToggledFields');
				if ($toggledFields.length > 0) {
					$toggledFields.on('change', '.jsToggleSelect', function () {
						var $select = $(this);
						var $scope = $select.closest('.jsToggledFields');
						$scope.find('[class^="jsToggledFieldsType"]').attr('hidden', 'hidden').find('input').removeAttr('required');
						$scope.find('[class^="jsToggledFieldsType' + $select.val() + '"]').removeAttr('hidden').find('input').attr('required', 'required');
					});
				}
			}
		});
		window.SF2.showError = function (msg) {
			var alertHtml = '<div class="uk-alert tm-alert tm-alert-danger">' + msg + '</div>';
			UIkit.modal.dialog(alertHtml, {
				stack: true
			});
		}
		$('[type=checkbox]', $sf2forms).addClass('uk-checkbox uk-margin-small-right');
		$('[name=captcha]', $sf2forms).addClass('uk-input uk-form-large').attr('autocomplete', 'off').closest('.sf2-element-captcha').addClass('uk-flex uk-flex-middle').find('.sf2-element-captcha-image').addClass('uk-margin-small-right');
	}
	$sf2forms.length && sf2Improvements();
	var $campaignForms = $('form.campaign-form-tag');
	if ($campaignForms.length > 0) {
		var url = new URL(window.location.href);
		var campaign = url.searchParams.get("utm_campaign");
		if (campaign) {
			$campaignForms.prepend('<input type="hidden" name="campaign" value="' + campaign + '">');
		}
	}
	$('.tm-offcanvas-search').find('[type=search]').before('<button type="submit" class="uk-search-icon-flip" uk-search-icon></button>');
	$('.tm-navbar-search').on('show', function () {
		$(this).find('[type=search]').focus();
	});
	var $orderForms = $('[action~="cart"], [action~="credit"]');
	$orderForms.validate({
		errorClass: 'uk-form-danger',
		errorElement: 'div',
		validClass: 'tm-form-success',
	});
	$orderForms.find('[type=email]').rules('add', 'current_email');
	$orderForms.find('[type=tel]').rules('add', {
		mobile: true,
		minlength: 11,
	});
	$orderForms.find('[name*="[username]"]').suggestions({
		addon: 'none',
		count: 5,
		type: 'NAME',
		scrollOnFocus: false,
		token: dadataToken
	});
	$orderForms.find('[type=email]').suggestions({
		addon: 'none',
		count: 5,
		type: 'EMAIL',
		scrollOnFocus: false,
		token: dadataToken
	});
	var $registrationForm = $('#member-registration');
	$registrationForm.validate({
		errorClass: 'uk-form-danger',
		errorElement: 'div',
		validClass: 'tm-form-success',
		rules: {
			'jform[email2]': {
				equalTo: '#jform_email1',
			},
			'jform[password2]': {
				equalTo: '#jform_password1',
			}
		},
		messages: {
			'jform[email2]': {
				equalTo: 'Адреса электронной почты не совпадают',
			},
			'jform[password2]': {
				equalTo: 'Пароли не совпадают',
			}
		}
	});
	$registrationForm.find('[type=email]').each(function () {
		$(this).rules('add', 'current_email')
	});
	$registrationForm.find('[type=tel]').rules('add', {
		mobile: true,
		minlength: 11,
	});
	$registrationForm.find('#jform_name').suggestions({
		addon: 'none',
		count: 5,
		type: 'NAME',
		scrollOnFocus: false,
		token: dadataToken
	});
	$registrationForm.find('[type=email]').suggestions({
		addon: 'none',
		count: 5,
		type: 'EMAIL',
		scrollOnFocus: false,
		token: dadataToken
	});
});