import ContainerBoard from '@/containers/board/index.vue';
import { mapGetters, mapActions } from 'vuex';

export default {

  components: {
    'z-container-board': ContainerBoard,
  },


  computed: {
    ...mapGetters([
      // 'myId',
      // 'isLogin',
    ]),
    ...mapGetters({
      me: 'me/getAllData',
      opponent: 'opponent/getAllData',
    }),
  },

  methods: {
    ...mapActions({
      surrender: 'game/surrender',
      // getUser: 'opponent/loadUser',
    }),
  },

  beforeRouteLeave(to, from, next) {
    if (to.params.force) next();
    next(false);
  },
};
