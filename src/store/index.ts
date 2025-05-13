import { createStore } from 'vuex';

export default createStore({
  state: {
    apiLavender: process.env.VUE_APP_API_LAVENDER || "https://localhost:7080",
    apiImages: process.env.VUE_APP_API_IMAGES || "https://localhost:7299"
  },
  getters: {
    getApiLavender(state) {
      return state.apiLavender;
    },
    getApiImages(state) {
      return state.apiImages;
    }
  }
})

export const GET_API_LAVENDER_URL = "getApiLavender";
export const GET_API_IMAGES_URL = "getApiImages";
