import Mutations from "../mutations";

const {TOGGLE_LOADER} = Mutations;

const loaderStore = {
  state: {
    isShowLoader: false,
  },
  getters: {
    isShowLoader: ({ isShowLoader }) => isShowLoader,
  },
  mutations: {
    [TOGGLE_LOADER]: (state, value) => {
      state.isShowLoader = value;
    },
  },
  actions: {
    toggleLoader({ commit }, value) {
      commit("TOGGLE_LOADER", value);
    }
  }
};

export default loaderStore;
