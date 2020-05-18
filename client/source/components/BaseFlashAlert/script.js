export default {

  name: 'z-flash-alert',

  props: {
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
        'flash-alert': true,
      };
      if (this.icon) {
        classes['flash-alert_icon'] = true;
        classes[`flash-alert_icon-${this.type}`] = true;
      }
      classes[`flash-alert_color-${this.type}`] = true;
      return classes;
    },
  },

  mounted() {
    if (this.autoDelete) {
      setTimeout(() => this.close(), this.autoDelete);
    }
  },
};
