export default {

  name: 'alert-box',

  props: {
    initShow: {
      type: Boolean,
      default: false,
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

  data() {
    return {
      show: this.initShow,
    };
  },

  methods: {
    close() {
      this.show = false;
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
