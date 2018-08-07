export default {
  name: 'z-tab',

  props: {
    title: {
      type: String,
      required: true,
      default: 'null',
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },

  mounted() {
    this.isActive = this.selected;
  },
};
