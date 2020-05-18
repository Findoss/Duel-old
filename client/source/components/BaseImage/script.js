export default {
  name: 'z-image',

  props: {
    src: {
      type: String,
      default: '',
      required: true,
    },
  },

  data() {
    return {
      loading: true,
    };
  },

  methods: {
    onload() {
      this.loading = false;
    },
  },
};