const gulp = require('gulp');
const uglify = require('gulp-uglify');
const liveReload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const gls = require('gulp-live-server');
const htmlMin = require('gulp-htmlmin');
const autoPrefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const zip = require('gulp-zip');
const babel = require('gulp-babel');

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
		.pipe(plumber(function (err) { // we mistype something in css, plumber plugin will trigger and display where the error was
			console.log('Styles Task Error'); 
			console.log(err.toString()); // because we use plumber if we trigger an error it won't break our console any won't need to restart
			this.emit('end');
		}))
        .pipe(sourcemaps.init()) // ** we initialize srouce maps befoe fixes and concat
        .pipe(autoPrefixer({ // creates fixes for our css to fit every brwoser's needs
    // browsers: ['last 2 versions', 'ie 8'] // or we can specifily say autoprefix Only for last 2 versions of all modern browsers
})) // and also internet exp 8
.pipe(concat('newstyle.css')) // name of the new file we're creating
.pipe(minifyCss()) // this will compress our CSS file and remove all empty lines and spacing == better performance
.pipe(sourcemaps.write()) // ** and we finish here before place compressed files into dist folder. 
// With sourcemaps we can see original css maps in chrome dev tools (inspect) rather than seeing all compressed in
// one folder, as we did in dist folder which we imported in index.html
.pipe(gulp.dest(DEST_PATH))
.pipe(liveReload());
});


// Scripts
gulp.task("scripts", () => {
console.log("Starting scripts task");

return gulp.src(SCRIPTS_PATH) // all JS files resources/js/*.js  // replace with SCRIPTS_PATH
	.pipe(plumber(function (err) { // we mistype something in css, plumber plugin will trigger and display where the error was
			console.log('Styles Task Error'); 
			console.log(err); // because we use plumber if we trigger an error it won't break our console any won't need to restart
			this.emit('end');
		}))
.pipe(sourcemaps.init()) // ** before we uglify and concatenate we call write
.pipe(uglify()) // uglify ==> get rid of the white space
.pipe(concat('newscripts.js')) // compressing selected files into this newscripts.js file
.pipe(sourcemaps.write()) // ** after we uglify and concatenate we call write
  //  .pipe(babel())
.pipe(gulp.dest(DEST_PATH)) // compressing selected files into this folder
.pipe(liveReload()); // Telling gulp to reload browser when compression is complete
});

// Images
gulp.task("images", () => {
console.log("Starting images task");
});


// Clean
gulp.task('clean', () => {
return del.sync([DEST_PATH]); // array of paths I want to remove // deletes dist folder 
});


// Zip files
gulp.task('export', () => {
return gulp.src(['web-info/**/*', 'resources/**/*'])
.pipe(zip('website.zip'))
.pipe(gulp.dest('./')); // export everything from web-info and resorces into source directory zip file website.zip
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
gulp.task('default', ['html', 'styles', 'scripts', 'watch'], () => { // Will run what's inside [] when we run default task (just type gulp)
console.log("Starting default task");
});
