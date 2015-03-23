$(function () {
	app.router = Backbone.Router.extend({
		el: $("#content"),
		routes: {
			'': 'index',
			'/': 'index',
			'!/': 'index',
		},
		initialize: function () {
			//Backbone.history.start();
			app.init();
		},
		index: function () {
			app.preRoute(this.el);
			new IndexView({ el: this.el });
		}
	});
	app.router = new app.router();
});