export default {

  name: 'z-alert',

  props: {
    show: {
      type: null,
    },
    type: {
      type: String,
      default: null,
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
      default: false,
    },
    autoDelete: {
      type: Number,
      default: 3000,
    },
  },

  methods: {
    close() {
      this.$emit('close', false);
    },
  },

  computed: {
    classes() {
      const classes = {
        'base-alert': true,
      };
      if (this.icon) {
        classes.icon = true;
        classes[`icon-${this.type}`] = true;
      }
      classes[`color-${this.type}`] = true;
      return classes;
    },
  },

  mounted() {
    if (this.autoDelete) {
      setTimeout(() => this.close(), this.autoDelete);
    }
  },
};
