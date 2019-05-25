import sbAdmin from './components/sb-admin';
import storage from './components/storage';
import kit from './components/kit';

export default () => {
  sbAdmin();

  if (storage.get('menu-toggle')) {
    $('body').addClass('sidebar-toggled');
    $('.sidebar').addClass('toggled');
    $('.sidebar .collapse').collapse('hide');
  }

  const logged_in = kit.elemId('logged_in');
  if (logged_in) {
    logged_in.textContent = storage.get('user')
      ? storage.get('user').name
      : 'ゲスト';
  }
};
