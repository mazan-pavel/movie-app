import mutations from '../mutations';

const { SHOW_TOAST_NOTIFY } = mutations;

const notificationsStore = {
  state: {
    messagePool: [],
  },
  getters: { messagePool: ({ messagePool }) => messagePool[messagePool.length - 1] },
    actions: {
        showNotify({commit}, msg) {
            commit(SHOW_TOAST_NOTIFY,msg);
      }
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state, message) {
      state.messagePool.push(message);
    },
  },
};
export default notificationsStore;