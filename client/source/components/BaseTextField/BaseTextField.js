export default {

  name: 'text-field',

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
    initialValue: {
      type: String,
      default: '',
    },
    customClasses: {
      type: String,
    },
    validationStatus: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'valid', 'invalid', 'pending'].indexOf(value) !== -1;
      },
    },
    validationError: {
      type: String,
      default: '',
    },
    validationIcon: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      value: this.initialValue,
    };
  },

  computed: {
    classes() {
      const classes = {
        'base-input': true,
      };

      if (this.validationIcon) {
        switch (this.validationStatus) {
          case 'valid':
            classes['is-autocheck-successful'] = true;
            break;
          case 'invalid':
            classes['is-autocheck-error'] = true;
            break;
          case 'pending':
            classes['is-autocheck-loading'] = true;
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
