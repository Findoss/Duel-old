import { mapGetters } from 'vuex';

export default {

  name: 'z-skill',

  props: {
    id: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters([
      'pathSkill',
    ]),
  },

  methods: {
    click(event) {
      this.$emit('click', event);
    },
  },
};
