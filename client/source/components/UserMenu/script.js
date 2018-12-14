import { mapActions, mapGetters } from 'vuex';

export default {

  name: 'z-user-menu',

  data: () => ({
    showMenu: false,
  }),

  props: {
    estate: {
      type: Object,
      default: () => ({
        gold: 9999,
        diamond: 9999,
      }),
    },
    nickname: {
      type: String,
      default: 'САМЫЙ_ДЛИННЫЙ_НИКНЕЙМ',
    },
    level: {
      type: Number,
      default: 9999,
    },
  },

  computed: {
    ...mapGetters({
      userData: 'me/getAllData',
    }),
  },

  methods: {
    ...mapActions({
      signOut: 'me/account/signOut',
    }),

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
