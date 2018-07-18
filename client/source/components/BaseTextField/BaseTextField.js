import debounce from 'debounce';

export default {

  name: 'z-text-field',
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
    validationRules: {
      type: Array,
    },
    validationIcon: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      status: '',
      error: '',
    };
  },

  methods: {
    updateField(value) {
      if (this.validationRules) {
        this.$emit('validation', false);
        this.validation();
      }
      this.$emit('input', value);
    },
    reset() {
      this.error = '';
      this.status = '';
      this.$emit('input', '');
    },
  },

  created() {
    this.validation = debounce(() => {
      this.error = '';
      this.status = 'pending';
      this.validationRules.reduce((acc, rule) => acc.then(rule), Promise.resolve(this.value))
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

      if (this.validationIcon) {
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
