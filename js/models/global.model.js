GlobalModel = function (jsonPath, callback, show_loader) {
	var model = new Backbone.Model(),
		defaultError = {
			Heading: 'Request Timed Out',
			Message: 'Your request timed out, you may have limited or no Internet connectivity.'
		};

	if (show_loader !== false) {
		//app.showLoader();
	}
	$.get('http://www.stellarbiotechnologies.com/media/press-releases/json?limit=10', function (response) {
		model.set({resultset: response});

		callback(model);

	}).fail(function (response) {
		//alert(JSON.stringify(response))
		model.set({ resultset: { Error: defaultError } });
		new ErrorView({model: model});

	}).always(function () {
		app.hideLoader();
	});

	return model;
};
