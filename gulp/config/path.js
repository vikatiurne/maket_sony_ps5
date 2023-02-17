import * as nodePath from 'path';
// получаем название корневой папки
const rootFolder = nodePath.basename(nodePath.resolve());

const resFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  res: {
    files: `${resFolder}/files/`,
    html: `${resFolder}/`,
    css: `${resFolder}/css/`,
    js: `${resFolder}/js/`,
    img: `${resFolder}/img/`,
    fonts: `${resFolder}/fonts/`
  },
  src: {
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/app.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    fonts: `${srcFolder}/fonts/`
  },
  watch: {
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp,svg}`,
  },
  clean: {
    res: `${resFolder}`,
    img: `${resFolder}/img/**/*.*`
  },
  resFolder: resFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
