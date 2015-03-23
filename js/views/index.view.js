IndexView = Backbone.View.extend({
	events: {
		'click .next': 'fetchItem'
	},
	el: '#content',
	initialize: function () {
		var _this = this;
		GlobalModel('', function (model) {
			_this.render(model);
			app.afterRender();
		});

	},
	render: function (model) {
		var _this = this,
			data = _.sortBy(model.get("resultset").news, 'published');

		var news = {'news': data};
		var template = _.template(
			$("script.tmpl-index").html()
		);

		$("#content").html(
			template(news)
		);
	},
	appendArticles: function (model) {

		this.subView1 = new ArticleView(model);
		$('#articles').append(this.subView1.render());

		return false;
	},
	fetchItem: function () {
		var _this = this,
			newUrl,
			hasNumber = /\d/,
			cleanUrl = 'http://www.stellarbiotechnologies.com/media/press-releases/json',
			url = app.defaultUrl;

		if (hasNumber.test(url)) {
			count = $('.list-group-item').length;
			newUrl = cleanUrl + '?limit=' + (count + 10);
			app.defaultUrl = newUrl;
		}

		$.get(app.defaultUrl, _.bind(function (response) {
			_this.appendArticles(response)
		}, this));

		return false;
	}
});