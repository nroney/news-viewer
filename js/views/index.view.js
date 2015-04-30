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
		var _this = this;

		var template = _.template(
			$("script.tmpl-index").html()
		);

		$("#content").html(
			template()
		);
		_this.fetchItem();

		$(window).scroll(function() {
			if (  document.documentElement.clientHeight +
				$(document).scrollTop() >= document.body.offsetHeight )
			{
				// Display alert or whatever you want to do when you're
				//   at the bottom of the page.
				_this.fetchItem();
			}
		});
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