if (typeof jQuery != "undefined") jQuery(function ($) {
	$('html.js-supported').removeClass('js-supported').addClass('js-ready');
	var isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	if (isIos) {
		$('body').removeClass('device-ios-no').addClass('device-ios-yes');
	}
	window.dump = function (vars, name, showTrace) {
		if (typeof console == "undefined") return false;
		if (typeof vars == "string" || typeof vars == "array") var type = " (" + typeof vars + ", " + vars.length + ")";
		else var type = " (" + typeof vars + ")";
		if (typeof vars == "string") vars = '"' + vars + '"';
		if (typeof name == "undefined") name = "..." + type + " = ";
		else name += type + " = ";
		if (typeof showTrace == "undefined") showTrace = false;
		console.log(name, vars);
		if (showTrace) console.trace();
		return true
	};
	$(window).HyperPCGeoPhoneInput && $('input[type="tel"]').HyperPCGeoPhoneInput({
		'dadataApiKey': window.dadataToken || ''
	});
	$(window).HyperPCGeoCity && $('.jsGeoCity').HyperPCGeoCity({
		'dadataApiKey': window.dadataToken || ''
	});
	$(window).HyperPCScrollableList && $('.jsScrollableList').HyperPCScrollableList({});
	$(window).HyperPCScrollToTop && $('.jsToTopButton').HyperPCScrollToTop({});
	$(window).HyperPCLabelInfield && $('.tm-label-infield').HyperPCLabelInfield({});
	$(window).HyperPCDetailToggle && $('.jsDetailToggle').HyperPCDetailToggle({});
	$(window).HyperPCLoadIframe && $('body').HyperPCLoadIframe({});
	$(window).stickySidebar && $('.jsConfigBox', '.hp-configurator').stickySidebar({
		topSpacing: 60,
		bottomSpacing: 10
	});
	if ($('.sharer').length > 0) {
		var shareData = {
			url: document.location.href,
			title: $('meta[property="og:title"]').attr('content') || document.title,
			image: $('meta[property="og:image"]').attr('content') || $('link[rel="apple-touch-icon"]').attr('href'),
		};
		$('.sharer').attr('data-url', shareData.url).attr('data-title', shareData.title).filter('[data-sharer="vk"]').attr('data-image', shareData.image);
	}
	UIkit.modal.labels = {
		ok: 'Да',
		cancel: 'Отмена'
	};
	$('[uk-dropdown]').on('click', '.uk-close', function () {
		var $dropdown = $(this).closest('.uk-dropdown');
		$dropdown.css('display', 'none');
		$($dropdown[0].__uikit__.dropdown.toggle.$el).removeClass('uk-open');
	});
	$('[uk-drop]').on('click', '.uk-close', function () {
		var $drop = $(this).closest('[uk-drop]');
		$drop.css('display', 'none');
		UIkit.drop($drop).hide();
	});
	var $mainNav = $('.uk-navbar-nav', '.tm-nav-main');
	if ($mainNav.children('.uk-active').length < 1) {
		$mainNav.children().each(function () {
			if ($(this).find('.uk-active').length > 0) {
				$(this).addClass('uk-active');
				return false;
			}
		});
	}
	$mainNav.find('.uk-active ~ .uk-active').each(function () {
		$activesOnLevel = $(this).parent().children('.uk-active');
		var $aliasParentActive = $activesOnLevel.filter('.alias-parent-active');
		if ($aliasParentActive.length < $activesOnLevel.length) {
			$aliasParentActive.removeClass('uk-active');
		} else if ($aliasParentActive.length === $activesOnLevel.length) {}
	})
});