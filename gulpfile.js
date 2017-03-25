var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function(){
  console.log("Hello World")
});

gulp.task('sass', function(){
  return gulp.src('public/style/scss/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('public/style/css'))
});

gulp.watch('public/style/scss/**/*.scss', ['sass'])
