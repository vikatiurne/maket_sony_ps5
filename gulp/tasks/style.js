import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import rename from 'gulp-rename';
import groupMedia from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import minif from 'gulp-clean-css';
import webpcss from 'gulp-webpcss'

export function style() {
  return app.gulp
    .src(app.path.src.scss)//загрузка исходников
  //   .pipe(
  //       app.plugins.plumber(
  //         app.plugins.notify.onError({
  //           title: 'HTML',
  //           message: 'Error: <%= error.message %>',
  //         })
  //       )
  // )//обработка ошибок
    .pipe(app.plugins.replace(/@img\//g, '../img/' ))//меняем @img на img
    .pipe(sass({ outputStyle: 'expanded' }))//компиляция
    .pipe(groupMedia())//группировка медиа-запросов
    .pipe(webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp',
    }))//перевод css картинок в webp
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrouserList: ['last 5 version'],
        cascade: true,
      })
    )//добавление кросбраузерности
    .pipe(app.gulp.dest(app.path.res.css)) //выгрузка в папку с рез-м, для удобства проверки готового css, в продакшн закоментить
    .pipe(minif())//минификация css
    .pipe(rename({ extname: '.min.css' }))//перемеинование css в min.css
    .pipe(app.gulp.dest(app.path.res.css))//выгрузка в папку с рез-м
    .pipe(app.plugins.browsersync.stream());//обновление браузера
}
