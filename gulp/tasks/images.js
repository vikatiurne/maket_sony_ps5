import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp'

export function images() {
  return (
    app.gulp
      .src(app.path.src.img)//загрузка
      // .pipe(
      //   app.plugins.plumber(
      //     app.plugins.notify.onError({
      //       title: 'IMAGES',
      //       message: 'Error: <%= error.message %>',
      //     })//обработка оштбок
      //   )
      // )
      .pipe(app.plugins.newer(app.path.res.img))//проверка есть ли уже обработаные фото в папке с резу-м
      .pipe(webp())//перевод в формат webp
      .pipe(app.gulp.dest(app.path.res.img))//загрузка в папку с рез-м
      .pipe(app.gulp.src(app.path.src.img))//выгрузка фоток в формате webp
      .pipe(app.plugins.newer(app.path.res.img))//проверка на наличие уже обработаных
      .pipe(
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeVieBox: false }],
          interLaced: true,
          optimizationLevel: 5,
        })
      )//сжатие фоток
      .pipe(app.gulp.dest(app.path.res.img))//выгрузка в папку с рез-м
      .pipe(app.gulp.src(app.path.src.svg))//выгрузка svg
      .pipe(app.gulp.dest(app.path.res.img))//загрузка svg в папку с рез-м
      .pipe(app.plugins.browsersync.stream())//обновление браузера
  );
}
