export default {

  name: 'z-button',

  props: {
    type: {
      type: String,
      default: 'button',
    },
    customClasses: {
      type: String,
      default: '',
    },
  },

  methods: {
    click(event) {
      this.$emit('click', event);
    },
  },

  computed: {
    classes() {
      const classes = {
        'base-button': true,
      };
      classes[this.customClasses] = true;
      return classes;
    },
  },
};
