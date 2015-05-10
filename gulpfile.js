// Importing modules

var gulp         =  require('gulp'),
    minifycss    =  require('gulp-minify-css'),
    uglify       =  require('gulp-uglify'),
    rename       =  require('gulp-rename'),
    notify       =  require('gulp-notify'),
    autoprefixer =  require('gulp-autoprefixer'),
    concat       =  require('gulp-concat'),
    less         =  require('gulp-less'),
    fileinclude  =  require('gulp-file-include')
    del          =  require('del');


// Setting base paths 
// (you can edit at will but remember to change system folders accordingly)

var opts = {
    path: {
          appBase: 'app',
           assets: 'app/assets',
        templates: 'app/assets/templates',
             dist: 'app/dist',
          distCss: 'app/dist/css',
           distJs: 'app/dist/js'
    },
    messages: {
           stylesCompiled: 'Styles compiled.',
          scriptsCompiled: 'Scripts compiled.',
        templatesCompiled: 'HTML compiled.',
              allCompiled: 'Compiling finished.'
    },
      templateVar: '@@',
         basename: 'all',
        minSuffix: '.min',
      debugSuffix: '.debug',
      appMainPage: 'main.html',
    lineSeparator: "\n\n//-----\n\n"
};


// Tasks from now on...

gulp.task('compile:styles', ['clean:styles'], function(){
    return gulp.src(opts.path.assets + '/styles/main.less')
        .pipe(less())
        .pipe(autoprefixer('last 5 version'))
        .pipe(concat(opts.basename + '.css', {newLine: opts.lineSeparator}))
        .pipe(rename({suffix: opts.debugSuffix}))
        .pipe(gulp.dest(opts.path.distCss))
        .pipe(rename({basename: opts.basename, suffix: opts.minSuffix}))
        .pipe(minifycss())
        .pipe(gulp.dest(opts.path.distCss))
        .pipe(notify({message: opts.messages.stylesCompiled}));
});

gulp.task('compile:scripts', ['clean:scripts'], function(){
    return gulp.src(opts.path.assets + '/js/**/*.js')
        .pipe(concat(opts.basename + '.js', {newLine: opts.lineSeparator}))
        .pipe(rename({suffix: opts.debugSuffix}))
        .pipe(gulp.dest(opts.path.distJs))

        /* 
         * Bellow line is costly to run if your app have tons of .js files
         * but will help optimize your distribution scripts
         * so uncomment it only when generating production code
         */

        //.pipe(uglify())

        .pipe(rename({basename: opts.basename, suffix: opts.minSuffix}))
        .pipe(gulp.dest(opts.path.distJs))
        .pipe(notify({message: opts.messages.scriptsCompiled}));
});

gulp.task('compile:html', ['clean:html'], function(){
    return gulp.src(['app/main.html'])
        .pipe(fileinclude({
            prefix: opts.templateVar,
            basepath: opts.path.templates
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(opts.path.dist))
        .pipe(notify({message: opts.messages.templatesCompiled}));
});

gulp.task('compile:all', ['compile:styles', 'compile:scripts', 'compile:html'], function(){
    return notify({message: opts.messages.allCompiled});
});

gulp.task('clean:styles', function(cb){
    del(opts.path.distCss, cb);
});

gulp.task('clean:scripts', function(cb){
    del(opts.path.distJs, cb);
});

gulp.task('clean:html', function(cb){
    del('app/index.html', cb);
});


// Watchers from now on...

gulp.task('watch:all', function(){
    gulp.watch([opts.path.assets + '/styles/**/*.less', opts.path.assets + 'styles/**/*.css'], ['compile:styles']);
    gulp.watch([opts.path.assets + '/js/**/*.js', opts.path.assets + '/js/**/*.tag'], ['compile:scripts']);
    gulp.watch(['app/main.html', opts.path.assets + '/templates/*'], ['compile:html'])
});