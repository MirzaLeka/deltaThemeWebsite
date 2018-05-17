const gulp = require('gulp');
const uglify = require('gulp-uglify');
const liveReload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const gls = require('gulp-live-server');
const htmlMin = require('gulp-htmlmin');

const STYLES_PATH = 'resources/css/**/*.css';
const SCRIPTS_PATH = 'resources/js/**/*.js'; // grabs js inside of folders inside of /js folder
const DEST_PATH = 'resources/dist'; // route where all our compiled files will be stored
const HTML_PATH = 'web-info/**/*.html';

// HTML
gulp.task('html', () => {
console.log("Running html task");
return gulp.src(HTML_PATH)
.pipe(htmlMin({collapseWhitespace: true}))
.pipe(gulp.dest(DEST_PATH))
.pipe(liveReload());
})


// Styles
gulp.task('styles', () => {
console.log("Starting styles task"); /* To tun this task type gulp & name of the task, in this case styles, so it will be gulp styles  */
 
return gulp.src(STYLES_PATH)
.pipe(concat('newstyle.css')) // name of the new file we're creating
.pipe(minifyCss()) // this will compress our CSS file and remove all empty lines and spacing == better performance
.pipe(gulp.dest(DEST_PATH))
.pipe(liveReload());
});


// Scripts
gulp.task("scripts", () => {
console.log("Starting scripts task");

return gulp.src(SCRIPTS_PATH). // all JS files resources/js/*.js  // replace with SCRIPTS_PATH
pipe(uglify())
.pipe(gulp.dest(DEST_PATH)) // compressing selected files into this folder
.pipe(liveReload()); // Telling gulp to reload browser when compression is complete
});


// Images
gulp.task("images", () => {
console.log("Starting images task");
});

gulp.task('watch', () => {
console.log("Gulp is watching");
require('./server.js'); // starts server. We're doing this before we run watch
liveReload.listen();
gulp.watch('web-info/index.html', ['html']);
gulp.watch(SCRIPTS_PATH, ['scripts']); // in this path, run this (scripts) task we created earlier
gulp.watch(STYLES_PATH, ['styles']); // --> array of tasks (task names) we want to watch. in this case only scripts
});

// Default task -- no need to type default like with other tasks
gulp.task('default', () => {
console.log("Starting default task");
});
