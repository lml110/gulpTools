var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'), 
    concat = require('gulp-concat'), 
    uglify = require('gulp-uglify'), 
	imagemin = require('gulp-imagemin'),
	jshint = require('gulp-jshint'), 
	notify = require('gulp-notify'),
	pngquant = require('imagemin-pngquant'),
	jpegtran = require('imagemin-jpegtran'),
	tinypng = require('gulp-tinypng-compress');
	clean = require('gulp-clean');

//语法检查
gulp.task('jshint'， function () {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
	
gulp.task('minifycss', function() {
    return gulp.src('css/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
		.pipe(concat('main.css'))
		.pipe(rename({suffix: '.min'})) 
		.pipe(gulp.dest('dist/css'));   //输出文件夹
});
gulp.task('images-opt', function () {
    gulp.src('img/*.{png,jpg,jpeg}')
        .pipe(imagemin({
            progressive: true,
			optimizationLevel: 7,
            use: [pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('minifyjs', function() {
    return gulp.src('js/*.js')
		//.pipe(jshint())
		//.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'))  //输出
		.pipe(notify({ message: '脚本任务构建完成' }));
});
gulp.task('tinypng', function () {
    gulp.src('img/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'API_KEY',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('dist/images'));
});
gulp.task('imgmin', function () {
    var jpgmin = jpegtran({
            accurate: true,//高精度模式
            quality: "high",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        }),
        pngmin = pngquant({
            optimizationLevel: 4
        });
    gulp.src("img/*.*")
	.pipe(imagemin({
		use: [jpgmin, pngmin]
	}))
	.pipe(gulp.dest("dist/images"));
});
gulp.task('clean', function() {  
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
    .pipe(clean());
});