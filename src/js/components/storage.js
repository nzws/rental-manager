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
  clear() {
    if (!confirm('よろしいですか？')) return;
    config.clear();
    move.move('./index.html');
  }
};
