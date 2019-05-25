import kit from '../components/kit';
import storage from '../components/storage';
import toast from '../components/toast';
import move from '../components/move';

export default {
  login() {
    storage.delete('user');
    storage.delete('username');
    if (!storage.get('users') || Object.keys(storage.get('users')).length < 1) {
      alert(
        '管理用ユーザが一人も登録されていません。ユーザエディタに移動します。'
      );
      move.move('edit.user.html');
      return;
    }

    const username = kit.elemId('username').value;
    const password = kit.elemId('password').value;

    const userData = storage.get(`users.${username}`);

    if (!userData || userData.password !== password) {
      toast.new('ユーザIDかパスワードが間違っています。', '.bg-danger');
      return;
    }

    storage.set('user', userData);
    storage.set('username', username);
    move.move('./loan.html');
  },
  check() {
    if (storage.get('user')) {
      return;
    }

    document.body.innerHTML = '';
    window.ready = null;

    alert('ログインしてください。');
    move.move('./index.html');
  }
};
