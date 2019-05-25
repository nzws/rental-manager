import turbolinks from 'turbolinks';

export default {
  move(url) {
    return turbolinks.visit(url);
  },
  reload() {
    return turbolinks.visit(window.location);
  }
};
