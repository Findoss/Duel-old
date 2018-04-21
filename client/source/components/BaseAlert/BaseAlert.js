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
      classes[this.type] = true;
      return classes;
    },
  },
};
