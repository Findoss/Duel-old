import { mapActions, mapGetters } from 'vuex';

export default {

  name: 'z-user-menu',

  data: () => ({
    isShowMenu: false,
  }),

  computed: {
    ...mapGetters({
      user: 'me/getAllData',
    }),
  },

  methods: {
    ...mapActions({
      signOut: 'me/account/signOut',
    }),

    showMenu() {
      this.isShowMenu = !this.isShowMenu;
    },
  },
};
