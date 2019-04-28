var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    autoprefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server'),
    gzip = require('gulp-gzip'),
    critical = require('critical');


// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['> 2%']
    }))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('sass:prod', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
        browsers: ['> 2%']
    }))
    .pipe(gulp.dest('docs/css'));
})

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('docs/'));
});

// Minify index
gulp.task('html:prod', function() {
  return gulp.src('src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('docs/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('src/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'));
});

gulp.task('scripts:prod', function() {
  return browserify('src/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/img'));
});

gulp.task('CNAME', function() {
  return gulp.src('CNAME')
    .pipe(gulp.dest('docs'));
});

gulp.task('favicons', function() {
  return gulp.src('src/favicons/*')
    .pipe(gulp.dest('docs'));
})

// Watch task
gulp.task('watch', function() {
  gulp.watch('src/js/**/**/*.js', ['scripts']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/img/*', ['images']);
});

// start server
gulp.task('serve', function() {
  var server = gls.static('docs', 3000);
  server.start().then(function(result) {
    process.exit(result.code);
  });

  gulp.watch(['build/css/main.css', 'build/index.html', 'build/js/app.js'], function(file) {
    server.notify.apply(server, [file]);
  });
});

// Inline critical styles
gulp.task('critical', ['build'], function (cb) {
    critical.generate({
        inline: true,
        base: 'docs/',
        src: 'index.html',
        dest: 'index.html',
        minify: true,
        width: 320,
        height: 520,
        extract: true
    });
});

// Default task
gulp.task('dev', ['html', 'sass', 'images', 'favicons', 'watch', 'serve']);

// Build task
gulp.task('build', ['sass:prod', 'html:prod', 'images', 'favicons', 'CNAME']);

gulp.task('dev:build', ['sass:prod', 'html:prod', 'images', 'watch', 'serve']);

// git build push command
// git push origin `git subtree split --prefix build gh-pages`:gh-pages --force