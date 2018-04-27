export default {

  name: 'z-alert',

  model: {
    prop: 'show',
    event: 'click',
  },

  props: {
    show: {
      type: null,
    },
    type: {
      type: String,
      default: 'info',
      validator(val) {
        return ['info', 'error', 'success', 'warning'].includes(val);
      },
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    close() {
      this.$emit('click', false);
    },
  },

  computed: {
    classes() {
      const classes = {
        'base-alert': true,
      };
      if (this.icon) {
        classes.icon = true;
        classes[`${this.type}-icon`] = true;
      }
      classes[this.type] = true;
      return classes;
    },
  },
};
