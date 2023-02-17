import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import newer from 'gulp-newer';
import replace from 'gulp-replace'


export const plugins = {
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  replace: replace,
};
