import kit from '../components/kit';
import toast from '../components/toast';
import storage from '../components/storage';
import move from '../components/move';
import table from '../components/table';

export default {
  add(object) {
    const type = object.dataset.type;

    if (type === 'users') {
      const name = kit.elemId('new_name').value;
      const username = kit.elemId('new_username').value;
      const password = kit.elemId('new_password').value;

      if (!name || !username || !password) {
        toast.new('必要事項が記入されていません。', '.bg-danger');
        return;
      }

      if (storage.get(`users.${username}`)) {
        toast.new(
          'このユーザIDは使用されています。先に削除してください。',
          '.bg-danger'
        );
        return;
      }

      storage.set(`users.${username}`, {
        name,
        password
      });
    } else if (type === 'list') {
      const place = kit.elemId('new_place').value;
      const name = kit.elemId('new_name').value;
      const count = parseInt(kit.elemId('new_count').value);

      if (!place || !name || !count) {
        toast.new('必要事項が記入されていません。', '.bg-danger');
        return;
      }

      const data = storage.get('list') || [];

      for (let i = 1; i <= count; i++) {
        data.push({
          place,
          category: name,
          name: name + i,
          is_loan: false
        });
      }

      storage.set('list', data);
    }

    move.reload();
  },
  delete(object) {
    const type = object.dataset.type;

    if (!confirm('削除します。よろしいですか？')) return;

    if (type === 'users') {
      storage.delete(`users.${object.dataset.username}`);
    } else if (type === 'list') {
      const ddata = table.export();
      const data = storage.get('list') || [];

      ddata.forEach(value => {
        if (data[value]) {
          data[value].is_deleted = true;
        }
      });

      storage.set('list', data);
    } else if (type === 'loan') {
      const ddata = table.export();
      const loan = storage.get('loan') || [];
      const list = storage.get('list') || [];

      ddata.forEach(value => {
        if (loan[value]) {
          loan[value].is_deleted = true;
          list[loan[value].id].is_loan = false;
        }
      });

      storage.set('loan', loan);
      storage.set('list', list);
    }

    move.reload();
  },
  restoreDraft() {
    const data = storage.get('list');
    if (!data || !data[data.length - 1] || data[data.length - 1].is_deleted)
      return;
    const last = data[data.length - 1];

    kit.elemId('new_place').value = last.place;
  }
};
