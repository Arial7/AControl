var gulp = require("gulp");
var plugs = require("gulp-load-plugins")()
var bs = require("browser-sync").create();

function clientScripts() {
    return gulp.src([ "src/client/js/**/*.js", "src/client/js/**/*.jsx" ])
        .pipe(plugs.babel({ presets: [ "react", "es2015" ] })
            .on("error", plugs.notify.onError("JS: <%= error.message %>")))
        .pipe(plugs.rename({extname: ".js"}))
        .pipe(gulp.dest("dist/client/js"))
        .pipe(bs.stream());
}

function clientPages() {
    return gulp.src("src/client/pages/**/*.pug")
        .pipe(gulp.dest("dist/client/pages"));
}

function clientStyles() {
    return gulp.src("src/client/css/style.sass")
        .pipe(plugs.sass().on("error", plugs.sass.logError))
        .pipe(gulp.dest("dist/client/css"))
        .pipe(bs.stream());
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
    gulp.watch("src/client/js/**/*", clientScripts);
    gulp.watch("src/client/pages/**/*.pug", clientPages);
    gulp.watch("src/client/css/**/*.sass", clientStyles);
    gulp.watch("src/client/img/**/*", clientImages);
    gulp.watch("src/server/**/*.js", server);

    bs.init({
        proxy: "localhost:3030"
    })
}
var build = gulp.parallel(clientPages, clientScripts, clientImages, server);
var buildAndWatch = gulp.series(build, watch);

exports.build = build;
exports.default = buildAndWatch;
