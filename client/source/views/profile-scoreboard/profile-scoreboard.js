import { mapActions, mapGetters } from 'vuex';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu.vue';

export default {

  components: {
    'z-header-menu': HeaderMenu,
  },

  data() {
    return {
      users: [],
    };
  },

  computed: {
    ...mapGetters({
      myId: 'myId',
      pathAvatar: 'pathAvatar',
    }),
  },

  methods: {
    ...mapActions({
      loadScoreboard: 'me/loadScoreboard',
    }),
  },

  created() {
    this.loadScoreboard()
      .then((response) => {
        this.users = response;
      });
  },
};
