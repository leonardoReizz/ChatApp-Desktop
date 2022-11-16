import { store } from '../../main';

const Program = [
  {
    async clear(event: Electron.IpcMainEvent, arg: any) {
      store.clear();
      event.reply('clearResponse', {});
    },
  },
];
export default Program;
