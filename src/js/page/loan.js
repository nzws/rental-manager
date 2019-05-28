import table from '../components/table';
import kit from '../components/kit';
import storage from '../components/storage';
import toast from '../components/toast';
import move from '../components/move';

export default {
  open() {
    const nums = table.export(true);
    const data = [];
    const list = storage.get('list');

    nums.forEach(index => {
      data.push(list[index].name);
    });

    kit.elemId('loan_list').textContent = data.join(', ');

    $('#loanModal').modal('show');
  },
  excuse() {
    const classId = kit.elemId('new_class').value;
    const number = kit.elemId('new_number').value;

    if (!classId || !number) {
      toast.new('必要事項が記入されていません。', '.bg-danger');
      return;
    }

    const nums = table.export();
    const list = storage.get('list');
    const loan = storage.get('loan') || [];
    const username = storage.get('user').name;

    nums.forEach(index => {
      loan.push({
        id: index,
        name: list[index].name,
        created_at: Date.now(),
        created_by: username,
        classId,
        number
      });

      list[index].is_loan = true;
    });

    storage.set('list', list);
    storage.set('loan', loan);

    $('#loanModal').modal('hide');
    move.reload();
  },
  showNarrow() {
    let html = '';

    const type = kit.elemId('narrow').value;
    if (type) {
      const list = storage.get('list');
      const narrow = [];

      list.forEach(data => {
        if (narrow.indexOf(data[type]) === -1 && !data.is_deleted) {
          narrow.push(data[type]);
        }
      });

      narrow.forEach(id => {
        html += `<tr onclick="M.loan.excuseNarrow(this)"><td>${id}</td></tr>`;
      })
    } else {
      this.excuseNarrow(null);
    }

    kit.elemId('narrowList').innerHTML = html;
  },
  excuseNarrow(object) {
    table.destroy();
    if (!object) {
      table.draw('list', {
        hide_max: true
      });
      return;
    }

    this.showNarrow();

    const data = object.firstChild;
    const type = kit.elemId('narrow').value;
    data.className = 'clicked';

    table.draw('list', {
      hide_max: true,
      type,
      narrow: data.textContent
    });
  }
};
