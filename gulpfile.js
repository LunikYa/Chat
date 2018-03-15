const	gulp        = require('gulp'),
		sass        = require('gulp-sass'),
		plumber     = require('gulp-plumber'), // show mistakes
		watch       = require('gulp-watch'), // monitors the changes ща sass files
		cancatLibJs = require('gulp-concat'),
		uglify      = require('gulp-uglifyjs'), //min js
		browserSync = require('browser-sync'), //следит
		cssmin      = require('gulp-cssmin'), //min css
		rename 		= require('gulp-rename'),//rename
		del 		= require('del'),
		cache       = require('gulp-cache'),
		autopref 	= require('gulp-autoprefixer'),
		imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    	pngquant    = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
 

/* scss to css
// gulp.src - путь по которому лежит scss-файл который мы будем компилировать
// gulp.dest - путь в который мы будем генерить нашу css-ку
// plumber() - не выбрасывать из компилятора если есть ошибки
// errLogToConsole: true - выводить номер строки в которой допущена ошибка
	gulp.task ("name", ["tasks which must "], callback) - create new task
	gulp.src("source") - add file
	.pipe( plagin() ) - connect new plugin or new command
	.pipe(gulp.dest("foder")) - way to unload result */ 

gulp.task('sass', function(){
	gulp.src('src/scss/*.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.pipe(autopref(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true,  grid: true}))
	.pipe(gulp.dest('src/css'))
	.pipe(plumber.stop())
	.pipe(browserSync.reload({stream: true}))
	});

/*gulp.task('default', function() {
	gulp.watch('scss/**', function(event) {
	gulp.run('sass');
	})
});*/

gulp.task('browserSync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task("cancatLibJs", function(){
	gulp.src([
		"src/libs/jquery/dist/jquery.min.js", 
		"src/libs/magnific-popup/dist/jquery.magnific-popup.min.js"])
	.pipe(cancatLibJs('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest("src/js"));
});

gulp.task('cssLibs', ['sass'], function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['browserSync'/*, 'cssLibs', "cancatLibJs"*/], function() {
    gulp.watch('src/scss/*.scss', ['sass']) // Наблюдение за sass файлами
    gulp.watch('src/index.html', browserSync.reload) // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/js/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js);
});

gulp.task('img', function() {
    gulp.src('src/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); // Выгружаем на продакшен
});

gulp.task("del", function(){
	del.sync('build');
});


gulp.task('build', ['del', 'img', 'sass', 'cancatLibJs'], function() {

    let buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'src/css/main.css',
        'src/css/libs.min.css',
        ])
    .pipe(gulp.dest('build/css'))

    let buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('build/fonts'))

    let buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('build/js'))

    let buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('build'))

});
