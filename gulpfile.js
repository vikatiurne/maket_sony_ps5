//основной модуль
import gulp from 'gulp';

// импорт путей
import { path } from './gulp/config/path.js';

// импорт задач
import { copy } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { copyHtml } from './gulp/tasks/copyHtml.js';
import { plugins } from './gulp/config/plagins.js';
import { server } from './gulp/tasks/server.js';
import { style } from './gulp/tasks/style.js';
import { script } from './gulp/tasks/script.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

import { deleteAsync } from 'del';

// глобальная переменная для задач
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
  deleteAsync: deleteAsync,
};

// функция наблюдения за изменениями в файлах
function watch() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, copyHtml);
  gulp.watch(path.watch.scss, style);
  gulp.watch(path.watch.js, script);
  gulp.watch(path.watch.img, images);
}

// выпонение задач для шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// основная задача
const mainTask = gulp.series(
  fonts,
  gulp.parallel(copy, copyHtml, style, script, images)
);

// сценарий выполнения задач
const dev = gulp.series(clean, mainTask, gulp.parallel(server, watch));

// сценарий по умолчанию
gulp.task('default', dev);
