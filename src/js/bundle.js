import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import turbolinks from 'turbolinks';
import bootstrap from './bootstrap';

window.$ = jQuery;
window.onload = load;

turbolinks.start();
document.addEventListener('turbolinks:load', load);

function load() {
  if (window.ready) {
    window.ready();

    window.ready = null;
  }

  bootstrap();
}

import admin from './page/admin';
import login from './page/login';
import loan from './page/loan';
import table from './components/table';
import openUrl from './components/openurl';
import storage from './components/storage';

window.M = {
  admin,
  login,
  loan,
  table,
  openUrl,
  storage
};
