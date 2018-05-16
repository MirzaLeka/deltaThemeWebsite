const gulp = require('gulp');
const uglify = require('gulp-uglify');
const SCRIPTS_PATH = 'resources/js/**/*.js'; // grabs js inside of folders inside of /js folder
const liveReload = require('gulp-livereload');

// Styles
gulp.task('styles', () => {
console.log("Starting styles task");
/* To tun this task type gulp & name of the task, in this case styles, so it will be 
 gulp styles  */
});

// Scripts
gulp.task("scripts", () => {
console.log("Starting scripts task");

return gulp.src(SCRIPTS_PATH). // all JS files resources/js/*.js 
pipe(uglify())
.pipe(gulp.dest('resources/dist')) // compressing selected files into this folder
.pipe(liveReload()); // Telling gulp to reload browser when compression is complete

});

// Images
gulp.task("images", () => {
console.log("Starting images task");
});

gulp.task('watch', () => {
console.log("Gulp is watching");
require('./server'); // starts server. We're doing this before we run watch
liveReload.listen();
gulp.watch(SCRIPTS_PATH, ['scripts']); // --> array of tasks (task names) we want to watch. in this case only scripts
});

// Default task -- no need to type default like with other tasks
gulp.task('default', () => {
console.log("Starting default task");
});
