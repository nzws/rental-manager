import Config from 'electron-store';
import move from './move';

const config = new Config();

export default {
  set(key, value) {
    return config.set(key, value);
  },
  get(key) {
    return config.get(key);
  },
  delete(key) {
    return config.delete(key);
  },
  clearAll() {
    if (!confirm('"全てのデータ"を削除します。よろしいですか？（削除後再ログインが必要になります。）')) return;
    if (!confirm('まじ？')) return;

    config.clear();
    move.move('./index.html');
  },
  clear(type) {
    if (!confirm(`${type} の全削除を行います。よろしいですか？（削除後再ログインが必要になります。）`)) return;

    this.delete(type);
    move.move('./index.html');
  }
};
