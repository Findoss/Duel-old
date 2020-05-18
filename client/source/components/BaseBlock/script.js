export default {

  name: 'z-block',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: true,
    },
    opacity: {
      type: Number,
      default: 1,
    },
    border: {
      type: Boolean,
      default: true,
    },
    cursor: {
      type: String,
      default: 'wait',
      validator(val) {
        return ['wait', 'no-drop', ''].includes(val);
      },
    },
  },

  computed: {
    classes() {
      const classes = {
        'base-block': true,
      };
      classes['base-block--icon'] = this.icon;
      classes['base-block--border'] = this.border;
      classes[`base-block_opacity--${this.opacity}`] = this.opacity;
      classes[`base-block_cursor--${this.cursor}`] = this.cursor;
      return classes;
    },
  },

};
