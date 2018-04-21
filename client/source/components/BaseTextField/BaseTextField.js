import debounce from 'debounce';

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
    rules: {
      type: Array,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      value: this.initialValue,
      status: '',
      error: '',
    };
  },

  watch: {
    value() {
      if (this.rules) {
        this.$emit('validation', false);
        this.validation();
      }
      this.$emit('input', this.value);
    },
  },

  created() {
    this.validation = debounce(() => {
      const resultRules = [];
      for (let index = 0; index < this.rules.length; index++) {
        resultRules.push(this.rules[index](this.value));
      }

      this.error = '';
      this.status = 'pending';
      Promise.all(resultRules)
        .then(() => {
          this.status = 'valid';
          this.$emit('validation', true);
        })
        .catch((error) => {
          this.status = 'invalid';
          this.error = error.message;
        });
    }, 500);
  },

  computed: {
    classes() {
      const classes = {
        'base-input': true,
      };

      if (this.icon) {
        switch (this.status) {
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
