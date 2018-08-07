export default {
  name: 'z-tabs',

  data() {
    return {
      tabs: [],
    };
  },

  mounted() {
    this.tabs = this.$children;
  },

  methods: {
    selectTab(id) {
      this.tabs.forEach((tab, index) => {
        tab.isActive = (id === index);
      });
    },
  },
};
