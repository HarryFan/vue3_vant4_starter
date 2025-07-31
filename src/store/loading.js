import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false,
    loadingText: '加載中...',
  }),

  actions: {
    showLoading(text = '加載中...') {
      this.loading = true;
      this.loadingText = text;
    },

    hideLoading() {
      this.loading = false;
      this.loadingText = '加載中...';
    },

    setLoading(loading, text = '加載中...') {
      this.loading = loading;
      this.loadingText = text;
    },
  },
});

export default useLoadingStore;
