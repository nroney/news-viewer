var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csslint = require('gulp-csslint');
var uglifycss = require('gulp-uglifycss');
var jslint = require('gulp-jslint');
var htmlreplace = require('gulp-html-replace');
var copy = require('gulp-copy');

gulp.task('compress-css', function () {
	gulp.src('./dist/css/app.css')
		.pipe(uglifycss())
.pipe(gulp.dest('./dist/css/'));
});

gulp.task('compress-js', function() {
	gulp.src('./dist/js/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
});

gulp.task('concat-scripts', function() {
	gulp.src(['./node_modules/jquery/dist/cdn/jquery-2.1.3.js', './node_modules/**/underscore.js',  './node_modules/**/backbone.js', './js/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist/js/'))
});

gulp.task('concat-css', function() {
	gulp.src(['css/*.css'])
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./dist/css/'))
});

gulp.task('css-lint', function() {
	gulp.src('css/*.css')
		.pipe(csslint())
		.pipe(csslint.reporter());
});

gulp.task('js-lint', function () {
	return gulp.src(['./js/*.js'])

		.pipe(jslint({
			node: true,
			evil: true,
			nomen: true,
			global: [],
			predef: [],
			reporter: 'default',
			edition: '2014-07-08',
			errorsOnly: true
		}))
		.on('error', function (error) {
			console.error(String(error));
		});
});

gulp.task('index-change', function() {
	gulp.src('index.html')
		.pipe(htmlreplace({
			'css': 'css/app.css',
			'js': 'js/app.js'
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy-images', function() {
	gulp.src(['./images/**/*.*'])
		.pipe(copy('dist/'));
});

gulp.task('copy-fonts', function() {
	gulp.src(['./fonts/**/*.*'])
		.pipe(copy('dist/'));
});



gulp.task('build', ['concat-scripts', 'concat-css', 'compress-js', 'compress-css', 'index-change', 'copy-images', 'copy-fonts']);