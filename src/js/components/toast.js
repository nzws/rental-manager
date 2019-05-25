import kit from './kit';

export default {
  new(
    text,
    bgColor = '.bg-primary',
    textColor = '#fff',
    allow_html = false,
    close_delay = 3500
  ) {
    if (!text) {
      return false;
    }

    const bgClass = bgColor.includes('.') ? bgColor.replace('.', '') : '';

    const id = kit.randInt(0, 100000);
    const element = document.createElement('div');

    element.id = `toast_${id}`;
    element.className = `${bgClass} M_toast show`;
    element.style.background = !bgColor.includes('.') ? bgColor : '';
    element.style.color = textColor;

    if (allow_html) {
      element.innerHTML = text;
    } else {
      element.textContent = text;
    }

    document.body.appendChild(element);

    if (close_delay > 0) {
      setTimeout(() => this.close(id), close_delay);
    }

    return id;
  },
  close(id) {
    const elem = kit.elemId(`toast_${id}`);

    if (elem) {
      elem.classList.remove('show');
      setTimeout(() => kit.elemRemove(elem), 200);
    }
  }
};
