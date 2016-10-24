var gulp = require("gulp");
var plugs = require("gulp-load-plugins")()

function clientScripts() {
    return gulp.src("src/client/js/**/*.js")
        .pipe(plugs.babel({ presets: [ "es2015" ] }))
        .pipe(gulp.dest("dist/client/js"));
}

function clientPages() {
    return gulp.src("src/client/pages/**/*.pug")
        .pipe(gulp.dest("dist/client/pages"));
}

function clientStyles() {
    return gulp.src("src/client/css/style.sass")
        .pipe(plugs.sass().on("error", plugs.sass.logError))
        .pipe(gulp.dest("dist/client/css"));
}

function clientImages() {
    return gulp.src("src/client/img/**/*")
        .pipe(gulp.dest("dist/client/img"));
}

function server() {
    return gulp.src("src/server/**/*.js")
        .pipe(gulp.dest("dist"));
}

function watch() {
    gulp.watch("src/client/js/**/*.js", clientScripts);
    gulp.watch("src/client/pages/**/*.pug", clientPages);
    gulp.watch("src/client/css/**/*.sass", clientStyles);
    gulp.watch("src/client/img/**/*", clientImages);
    gulp.watch("src/server/**/*.js", server);
}
var build = gulp.parallel(clientPages, clientScripts, clientStyles, clientImages, server);
var buildAndWatch = gulp.series(build, watch);

exports.build = build;
exports.default = buildAndWatch;
