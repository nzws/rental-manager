import { shell } from 'electron';

export default url => {
  return shell.openExternal(url);
};
