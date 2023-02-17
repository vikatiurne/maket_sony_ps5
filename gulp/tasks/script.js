import webpack from 'webpack-stream';

export function script() {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: true }) //загрузка исходников
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    ) //обработка ошибок
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'app.min.js',
        },
      })
    )

    .pipe(app.gulp.dest(app.path.res.js)) //выгрузка в папку с результатом
    .pipe(app.plugins.browsersync.stream()); //обновление браузера
}
