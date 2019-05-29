import datatables from 'datatables.net-bs4';
import storage from './storage';
import kit from './kit';

export default {
  load(data) {
    if (!kit.elemId('dataTable')) {
      return;
    }

    this.export();
    datatables(window, $);
    window.table = $('#dataTable').DataTable({
      data,
      order: [[0, 'asc']],
      language: {
        sProcessing: '処理中...',
        sLengthMenu: '_MENU_ アイテム表示',
        sZeroRecords: 'アイテムはありません。',
        sInfo: ' _TOTAL_ アイテム中 _START_ から _END_ まで表示',
        sInfoEmpty: ' 0 アイテム中 0 から 0 まで表示',
        sInfoFiltered: '（全 _MAX_ 件より抽出）',
        sInfoPostFix: '',
        sSearch: '検索:',
        sUrl: '',
        oPaginate: {
          sFirst: '先頭',
          sPrevious: '前',
          sNext: '次',
          sLast: '最終'
        }
      }
    });
  },
  destroy() {
    return window.table.destroy();
  },
  draw(type, option = {}) {
    const data = storage.get(type);
    const username = storage.get('username');

    if (!data) {
      this.load([]);
      return;
    }

    let formatted = [];
    switch (type) {
      case 'users':
        Object.keys(data).forEach(key => {
          formatted.push([
            data[key].name,
            key,
            key === username
              ? 'あなた'
              : `<button class="btn btn-sm btn-danger btn-block" data-username="${key}" data-type="users" onclick="M.admin.delete(this)">削除</button>`
          ]);
        });
        break;
      case 'list':
        data.forEach((value, index) => {
          if (value.is_deleted) return;
          if (value.is_loan && option.hide_max) return;
          if (option.type && value[option.type] !== option.narrow) return;

          const btn = `<button class="btn btn-sm btn-outline-secondary btn-block" data-id="${index}" onclick="M.table.check(this)"><i class="fas fa-square"></i></button>`;

          formatted.push(option.hide_max ? [
            value.place,
            value.name,
            btn
          ] : [
            value.place,
            value.name,
            value.is_loan ? 'はい' : 'いいえ',
            btn
          ]);
        });
        break;
      case 'loan':
        data.forEach((value, index) => {
          if (value.is_deleted) return;

          formatted.push([
            value.name,
            new Date(value.created_at).toLocaleDateString('ja-JP'),
            value.classId,
            value.number,
            value.created_by,
            `<button class="btn btn-sm btn-outline-secondary btn-block" data-id="${index}" onclick="M.table.check(this)"><i class="fas fa-square"></i></button>`
          ]);
        });
        break;
      default:
        throw new Error('Unknown type');
    }

    this.load(formatted);
  },
  check(object) {
    const id = object.dataset.id;
    if (storage.get(`tmp.select.${id}`)) {
      object.classList.remove('btn-primary');
      object.classList.add('btn-outline-secondary');

      object.firstChild.classList.remove('fa-check-square');
      object.firstChild.classList.add('fa-square');

      storage.delete(`tmp.select.${id}`);
    } else {
      object.classList.add('btn-primary');
      object.classList.remove('btn-outline-secondary');

      object.firstChild.classList.add('fa-check-square');
      object.firstChild.classList.remove('fa-square');

      storage.set(`tmp.select.${id}`, true);
    }

    if (Object.keys(storage.get('tmp.select')).length > 0) {
      $('.save').fadeIn('fast');
      kit.elemId('save_count').textContent = Object.keys(
        storage.get('tmp.select')
      ).length;
    } else {
      $('.save').fadeOut('fast');
    }
  },
  export(no_del = false) {
    const data = storage.get('tmp.select');
    if (!data) return [];

    const formatted = [];
    Object.keys(data).forEach(key => formatted.push(parseInt(key)));
    if (!no_del) storage.delete('tmp.select');

    return formatted;
  }
};
