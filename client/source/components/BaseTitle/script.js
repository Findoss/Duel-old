export default {
  name: 'z-title',

  props: {
    size: {
      type: Number,
      default: 4,
      validator(val) {
        return (val > 0 && val < 5);
      },
    },
  },

  computed: {
    classes() {
      const classes = {
        title: true,
      };
      classes[`title-size-${this.size}`] = true;
      return classes;
    },
  },
};