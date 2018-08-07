import { mapGetters } from 'vuex';

export default {
  name: 'z-rune',

  props: [
    'type',
    'i',
    'j',
  ],

  computed: {
    ...mapGetters([
      'pathRune',
    ]),
  },

};
