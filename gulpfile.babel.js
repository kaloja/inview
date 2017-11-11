// --------------------------------------------------------
// Gulp setup
// --------------------------------------------------------

const gulp    = require('gulp');
const babel   = require('gulp-babel');
const concat  = require('gulp-concat');
const eslint  = require('gulp-eslint');
const header  = require('gulp-header');
const plumber = require('gulp-plumber');
const rename  = require('gulp-rename');
const uglify  = require('gulp-uglify');

// --------------------------------------------------------
// Banner to add to file headers
// --------------------------------------------------------

const banner = (
	`/*! inview | v1.0.0 */\n`
);

// --------------------------------------------------------
// Paths to project folders
// --------------------------------------------------------

const paths = {
	js: {
		input: './src/inview.js',
		output: './dist/'
	}
}

// --------------------------------------------------------
// Lint JS
// --------------------------------------------------------

gulp.task('lint:js', function() {
	return gulp.src(paths.js.input)
		.pipe(plumber())
		.pipe(eslint({
			'rules':{
				'indent': ['error', 2],
				'quotes': [1, 'single'],
				'semi': [1, 'always']
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

// --------------------------------------------------------
// Build JS
// --------------------------------------------------------

gulp.task('build:js', function() {
	return gulp.src(paths.js.input)
		.pipe(concat('inview.js'))
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error);
				this.emit('end');
			}
		}))
		.pipe(babel())
		.pipe(gulp.dest(paths.js.output))
		.pipe(rename('inview.min.js'))
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(gulp.dest(paths.js.output))
});

// --------------------------------------------------------
// Run Gulp
// --------------------------------------------------------

gulp.task('default', [
	'build:js'
], function () {
	gulp.watch(paths.js.input, ['build:js']);
});
