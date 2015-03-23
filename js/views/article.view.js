var ArticleView = Backbone.View.extend({
	initialize: function (model) {
		this.render(model);
	},
	render: function (model) {
		var template = _.template(
			$("script.tmpl-article").html()
		);

		$("#articles").html(
			template(model)
		);
	}
});