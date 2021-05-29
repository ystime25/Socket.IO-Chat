import gulp, { series } from "gulp";
import sass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import del from "del";
import bro from "gulp-bro";
import babelify from "babelify";

sass.compiler = nodeSass;

const path = {
  scss: {
    watch: "assets/scss/**/*.scss",
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
  },
  js: {
    watch: "assets/js/**/*.js",
    src: "assets/js/main.js",
    dest: "src/static/js",
  },
};

const clean = () => {
  return del(["static"]);
};

const watchFiles = () => {
  gulp.watch(path.scss.watch, styles);
  gulp.watch(path.js.watch, js);
};

const styles = () => {
  return gulp
    .src(path.scss.src)
    .pipe(sass())
    .pipe(csso())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(path.scss.dest));
};

const js = () => {
  return gulp
    .src(path.js.src)
    .pipe(
      bro({
        transform: [babelify.configure({ presets: ["@babel/preset-env"] }), ["uglifyify", { global: true }]],
      })
    )
    .pipe(gulp.dest(path.js.dest));
};

const dev = gulp.series(clean, styles, js, watchFiles);

export const build = gulp.series(clean, styles, js);

export default dev;
