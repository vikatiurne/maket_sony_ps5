import versionNumber from 'gulp-version-number';
import include from 'gulp-file-include';
import webpHtml from 'gulp-webp-html-nosvg';

export function copyHtml() {
  return app.gulp
    .src(app.path.src.html) //загрузка исходников
    // .pipe(
    //   app.plugins.plumber(
    //     app.plugins.notify.onError({
    //       title: 'HTML',
    //       message: 'Error: <%= error.message %>',
    //     })
    //   )
    // ) //обработка ошибок
    .pipe(include()) //сборка всех частей в один файл index.html
    .pipe(webpHtml()) //перевед фоток в формат webp
    .pipe(app.plugins.replace(/@img\//g, 'img/')) //меняем @img на img
    .pipe(
      versionNumber({
        value: '%DT%',
        append: {
          key: '_v',
          cover: 0,
          to: ['css', 'js'],
        },
        output: { file: 'gulp/version.json' },
      })
    ) //установка версии проекта(номер в link css и script js)
    .pipe(app.gulp.dest(app.path.res.html)) //выгрузка в папку с результатом
    .pipe(app.plugins.browsersync.stream()); //обновление браузера
}
