import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttfWoff from 'gulp-ttf2woff2';

// перевод всех шрифтов otf в ttf
export function otfToTtf() {
  return app.gulp
    .src(`${app.path.src.fonts}/*.otf`, {}) //загрузка шрифтов формата otf
    // .pipe(
    //   app.plugins.plumber(
    //     app.plugins.notify.onError({
    //       title: 'JS',
    //       message: 'Error: <%= error.message %>',
    //     })
    //   )
    // ) //обработка ошибок
    .pipe(fonter({ formats: ['ttf'] })) //замена формата на ttf
    .pipe(app.gulp.dest(app.path.src.fonts)); //выгрузка в исходную папку
}

// перевод всех шрифтов ttf в woff и woff2
export function ttfToWoff() {
  return app.gulp
    .src(`${app.path.src.fonts}/*.ttf`, {}) //загрузка шрифтов формата ttf, которые ранее были созданы
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    ) //обработка ошибок
    .pipe(fonter({ formats: ['woff'] })) //замена формата на woff
    .pipe(app.gulp.dest(app.path.res.fonts)) //выгрузка в папку с результатом шрифтов формата woff
    .pipe(app.gulp.src(`${app.path.src.fonts}/*.ttf`)) //загрузка шрифтов формата ttf
    .pipe(ttfWoff()) //замена формата на woff2
    .pipe(app.gulp.dest(app.path.res.fonts)); //выгрузка в папку с результатом шрифтов woff2
}

// запись подключенных шрифтов в файл стилей
export const fontsStyle = () => {
    //Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    //Проверяем, существуют ли файлы шрифтов
    fs.readdir(app.path.res.fonts, function(err, fontsFiles){
        if(fontsFiles) {
            //Проверяем, существует ли файл стилей для подключения шрифтов
            if(!fs.existsSync(fontsFile)) {
                //Если файла нет, создаём его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    //Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                //Если файл есть, выводим сообщение
                console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }

}