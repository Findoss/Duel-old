export default {

  name: 'z-input',
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    autocapitalize: {
      type: String,
      default: 'off',
    },
    autocorrect: {
      type: String,
      default: 'off',
    },
    customClasses: {
      type: String,
    },
    statusIcon: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'pending', 'valid', 'invalid'].includes(val);
      },
    },
    error: {
      type: String,
      default: '',
    },
  },

  methods: {
    update(event) {
      // кастомное события для запуска проверок
      this.$emit('update', event);
      // нативное событие для v-model
      this.$emit('input', event.target.value);
    },
  },

  computed: {
    classes() {
      const classes = {
        'base-input': true,
      };

      if (this.statusIcon) {
        switch (this.status) {
          case 'valid':
            classes['check-successful'] = true;
            break;
          case 'invalid':
            classes['check-error'] = true;
            break;
          case 'pending':
            classes['check-loading'] = true;
            break;
          default:
            break;
        }
      }

      if (this.customClasses) {
        classes[this.customClasses] = true;
      }

      return classes;
    },
  },
};

/*
  autocapitalize
  autocorrect
  placeholder
  disabled
  tabindex
  autofocus
*/
