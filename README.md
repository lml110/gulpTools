# gulp-工具

## 介绍

用于便捷方便使用

- css压缩
- 清除文件
- js压缩
- CommonJS模块合并 == ES6转ES5压缩
- 压缩图片
- 语法检查
- 监听Less文件 

## 使用方法

### 语法检查

```graph
	gulp.task('jshint'， function () {
		return gulp.src('js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
	});
```
### css压缩

```graph
	gulp.task('minifycss', function() {
	    return gulp.src('css/*.css')      //压缩的文件
	        .pipe(minifycss())   //执行压缩
			.pipe(concat('main.css'))
			.pipe(rename({suffix: '.min'})) 
			.pipe(gulp.dest('dist/css'));   //输出文件夹
	});
```
### js压缩

```graph
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
```
### 压缩图片

```graph
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
```

### 清除文件

```graph
	gulp.task('clean', function() {  
	  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
	    .pipe(clean());
	});
```

### CommonJS模块合并

```graph
	gulp.task("browserify", function () {
		var b = browserify({
			//entries: "js/app.js", || 外部使用
			entries: "module/utils/index.js",
			transform: []
		});

		return b.bundle()
			.pipe(source("main.js"))
			.pipe(buffer()) // 缓存文件内容
			.pipe(babel({
	              presets: ['es2015']
			}))
			.pipe(uglify())
	        .pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
	        .pipe(sourcemaps.write('.')) // 写入 .map 文件
			.pipe(gulp.dest("dist/js"))
	});
```

### 监听Less文件

```graph 
	gulp.task('testless', function () {
	    gulp.src('*.less') //该任务针对的文件
	        .pipe(less()) //该任务调用的模块
	        .pipe(gulp.dest('css'));//创建css文件夹
	});
```

