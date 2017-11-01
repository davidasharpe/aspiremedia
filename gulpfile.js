var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = '';
    sassStyle = 'expanded';
} else {
    outputDir = '_public';
    sassStyle = 'compressed';
}

jsSources = [
    'components/scripts/wow.min.js',
    'components/scripts/featherlight.min.js',
    'components/scripts/featherlight.gallery.min.js',
    'components/scripts/jquery.enllax.min.js',
    'components/scripts/jquery.scrollUp.min.js',
    'components/scripts/jquery.easing.min.js',
    'components/scripts/jquery.stickyNavbar.min.js',
    'components/scripts/jquery.waypoints.min.js',
    'components/scripts/images-loaded.min.js',
    'components/scripts/lightbox.min.js',
    'components/scripts/site.js',
    'components/scripts/carousel.js',
    'components/scripts/prefixfree.min.js'
];

sassSources = ['components/sass/style.scss'];
htmlSources = ['*.html'];

gulp.task('js', function(){
    gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSources)
    .pipe(compass({
        sass: 'components/sass',
        image: outputDir + 'images',
        style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss' ['compass']);
    gulp.watch('*.html' ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('*.html')
    .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);



