window.app = {
	defaultUrl : 'http://www.stellarbiotechnologies.com/media/press-releases/json?limit=10',

    preRoute: function (el) {
        el.unbind().empty().removeClass().off();
    },
    init: function () {
            Backbone.history.start();
            //app.ready();
    },
	showLoader: function(e){
		var $el = $(e.currentTarget).find('span');
		$el.addClass('btn-loading');

		return false;
	},
    hideLoader: function(e){
	/*var $el = $(e.currentTarget).find('span');

		setTimeout(function(){
			$el.removeClass('btn-loading');
		}, 2000);


		return false;*/
    },
    afterRender: function (aOptions) {

    },
    resize: function (aCallback) {
        var resizeTimeoutId = null;

        $(window).resize(resizeCallback);

        function resizeCallback() {
            if (resizeTimeoutId) {
                window.clearTimeout(resizeTimeoutId);
            }
            resizeTimeoutId = window.setTimeout(resizeAction, 250);
        }
        function resizeAction() {
            callback();
        }
    }


};