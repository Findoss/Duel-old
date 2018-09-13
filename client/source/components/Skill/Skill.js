import { mapGetters } from 'vuex';

export default {

  name: 'z-skill',

  props: {
    id: {
      type: String,
      default: '1',
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
